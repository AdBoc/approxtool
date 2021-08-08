import React, {
  useEffect,
  useState
} from 'react';
import { UserResponse } from '../../protos/userservice_pb';
import { token } from '../../utils/token';
import { Modal } from '../../common-components/Modal/Modal';
import { Button } from '../../common-components/Button/Button';
import { useModal } from '../../hooks/useModal';
import { RegisterForm } from '../RegisterForm';
import { mutateUser } from './UserManager.utils';
import { InputField } from '../../common-components/InputField/InputField';
import {
  Role,
  User
} from '../../types';
import { fetchTempUsers } from '../../temporary/sim-request/sim-request';
import styles from './styles.module.scss';
import { apiService } from '../../grpc-web/apiService';
import { useIsMounted } from '../../hooks/useIsMounted';
import { Tooltip } from '../../common-components/Tooltip/Tooltip';

export const UserManager: React.FC = (): JSX.Element => {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [renderPasswordInput, setRenderPasswordInput] = useState<boolean | string>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const isMounted = useIsMounted();
  const {isShowing: isRegisterForm, toggle: toggleRegisterForm} = useModal();

  useEffect(() => {
    async function fetchUsers() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempUsers().then(users => {
          if (isMounted()) setUsers(users);
        });
      } else {
        try {
          const response = await apiService.SearchForUsers(userQuery);
          if (isMounted()) {
            setUsers(response.toObject().usersList);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    fetchUsers();
  }, [userQuery, isMounted]);

  const handleChangePrivilege = async (userId: number) => {
    try {
      await apiService.ChangeUserPrivilege(userId);
      if (isMounted()) {
        setUsers(mutateUser.changePrivilege(users, userId));
        closeChangePassModal();
      }
    } catch (err) {
      console.error(err.code, err.message);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await apiService.DeleteUser(userId);
      if (isMounted()) {
        setUsers(mutateUser.deleteUser(users, userId));
        closeChangePassModal();
      }
    } catch (err) {
      console.error(err.code, err.message);
    }
  };

  const handleChangePassword = async (userId: number) => {
    if (typeof renderPasswordInput !== 'string' || renderPasswordInput.length < 6) return;

    try {
      await apiService.ChangePassword(userId, renderPasswordInput);
      if (isMounted()) {
        closeChangePassModal();
      }
    } catch (err) {
      console.error(err.code, err.message);
    }
  };

  const openChangePassModal = (userId: number) => {
    setUserId(userId);
    setRenderPasswordInput(true);
  };

  const closeChangePassModal = () => {
    setUserId(null);
    setRenderPasswordInput(false);
  };

  const renderOperationsButtons = (user: UserResponse.AsObject): JSX.Element => (
    <div className={styles.operationButtons}>
      {user.role === Role.USER && (
        <button type="button" onClick={() => handleChangePrivilege(user.id)}>Give Admin</button>
      )}
      <button type="button" onClick={() => openChangePassModal(user.id)}>Change Password</button>
      {token.decodedTokenData.user_id !== user.id && (
        <button type="button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
      )}
    </div>
  ); // TODO: SHOULD I RENDER IT HERE OR EXTRACT TO SEPARATE COM

  return (
    <div className={styles.usersWrapper}>
      <InputField
        label="Search by username:"
        value={userQuery}
        handler={e => setUserQuery(e.target.value)}
      />
      <section className={styles.tableWrapper}>
        <div className={`${styles.tableRow} ${styles.tableHeader}`}>
          <p>Username</p>
          <p>Email</p>
          <p>Status</p>
          <p>Operations</p>
        </div>
        {users.map((user) => (
          <div key={user.id} className={styles.tableRow}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <Tooltip className={styles.tooltipCustom} tooltipContent={renderOperationsButtons(user)}>
              <button type="button" className={styles.operation}>Operations</button>
            </Tooltip>
            <p>{user.role}</p>
          </div>
        ))}
      </section>
      <Button className={styles.addButton} type="button" text="Add user" onClick={toggleRegisterForm}/>
      <Modal isShowing={isRegisterForm} className={styles.modalRegisterWrapper}>
        <RegisterForm setUsers={setUsers} handleClose={toggleRegisterForm}/>
      </Modal>
      <Modal isShowing={Boolean(renderPasswordInput)}>
        <form className={styles.passwordForm}>
          <input type="text" autoComplete="username" hidden/>
          <InputField
            type="password"
            label="New Password"
            autoComplete="new-password"
            handler={(e) => setRenderPasswordInput(e.target.value)}
          />
          <p>Password must have 6 min characters</p>
          <Button type="submit" text="Send" onClick={() => handleChangePassword(userId!)}/>
          <Button type="button" text="Cancel" onClick={closeChangePassModal}/>
        </form>
      </Modal>
    </div>
  );
};
