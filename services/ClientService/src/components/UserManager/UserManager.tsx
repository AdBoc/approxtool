import React, {
  useEffect,
  useState
} from 'react';
import {
  apiSrv,
  fetchWithAuthRetry
} from '../../grpc-web';
import {
  ChangePasswordRequest,
  ChangePrivilegeRequest,
  DeleteUserRequest,
  Role,
  SearchRequest
} from '../../protos/userservice_pb';
import { roles } from '../../constants/constants';
import { token } from '../../utils/token';
import { Modal } from '../../common-components/Modal/Modal';
import { Button } from '../../common-components/Button/Button';
import { useModal } from '../../hooks/useModal';
import { RegisterForm } from '../RegisterForm';
import { mutateUser } from './UserManager.utils';
import { InputField } from '../../common-components/InputField/InputField';
import { User } from '../../types';
import { fetchTempUsers } from '../../temporary/sim-request/sim-request';
import styles from './styles.module.scss';

export const UserManager: React.FC = (): JSX.Element => {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [renderPasswordInput, setRenderPasswordInput] = useState<boolean | string>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const {isShowing: isRegisterForm, toggle: toggleRegisterForm} = useModal();

  useEffect(() => {
    async function fetchUsers() {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempUsers().then(users => setUsers(users));
      } else {
        const request = new SearchRequest();
        request.setSearchquery(userQuery);

        try {
          const result = await fetchWithAuthRetry(() => {
            request.setAccesstoken(token.accessToken);
            return apiSrv.searchForUsers(request, null);
          });

          setUsers(result.toObject().usersList);
        } catch (e) {
          console.error(e);
        }
      }
    }

    fetchUsers();
  }, [userQuery]);

  const handleChangePrivilege = async (userId: number) => {
    const request = new ChangePrivilegeRequest();
    request.setNewstatus(Role.ADMIN)

    try {
      await fetchWithAuthRetry(() => {
        request.setAccesstoken(token.accessToken);
        return apiSrv.changeUserPrivilege(request, null);
      });

      setUsers(mutateUser.changePrivilege(users, userId));
      closeChangePassModal();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const request = new DeleteUserRequest();
    request.setId(userId);

    try {
      await fetchWithAuthRetry(() => {
        request.setAccesstoken(token.accessToken);
        return apiSrv.deleteUser(request, null);
      });

      setUsers(mutateUser.deleteUser(users, userId));
      closeChangePassModal();
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangePassword = async (userId: number) => {
    if (typeof renderPasswordInput !== 'string') return;
    if (renderPasswordInput.length < 6) return;

    const request = new ChangePasswordRequest();
    request.setUserid(userId)
    request.setNewpassword(renderPasswordInput.toString());

    try {
      await fetchWithAuthRetry(() => {
        request.setAccessToken(token.accessToken);
        return apiSrv.changePassword(request, null);
      });
    } catch (e) {
      console.error(e);
    }

    closeChangePassModal();
  };

  const openChangePassModal = (userId: number) => {
    setUserId(userId);
    setRenderPasswordInput(true);
  }

  const closeChangePassModal = () => {
    setUserId(null);
    setRenderPasswordInput(false);
  };

  return (
    <div className={styles.usersWrapper}>
      <Button type="button" text="Add user" onClick={toggleRegisterForm}/>
      <InputField
        label="Search by username:"
        value={userQuery}
        handler={e => setUserQuery(e.target.value)}
      />
      <div className={`${styles.tableRow} ${styles.tableHeader}`}>
        <p>Username</p>
        <p>Email</p>
        <p>Status</p>
        <p>Operations</p>
      </div>
      {users.map((user) => (
        <div key={user.id} className={styles.tableRow}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Status: {roles[user.status]}</p>
          <div className={styles.userOperations}>
            {user.status === Role.BASIC_USER && (
              <button
                type="button"
                className={styles.operation}
                onClick={() => handleChangePrivilege(user.id)}
              >
                Give Admin
              </button>
            )}
            <button type="button" onClick={() => openChangePassModal(user.id)}>Change Password</button>
            {token.decodedTokenData.user_id !== user.id && (
              <button type="button" className={styles.operation}
                      onClick={() => handleDeleteUser(user.id)}>Delete</button>
            )}
          </div>
        </div>
      ))}
      <Modal isShowing={isRegisterForm} className={styles.modalRegisterWrapper}>
        <RegisterForm setUsers={setUsers} handleClose={toggleRegisterForm}/>
      </Modal>
      <Modal isShowing={Boolean(renderPasswordInput)}>
        <div className={styles.passwordForm}>
          <InputField label="New Password" handler={(e) => setRenderPasswordInput(e.target.value)}/>
          <p>Password must have 6 min characters</p>
          <Button type="submit" text="Send" onClick={() => handleChangePassword(userId!)}/>
          <Button type="button" text="Cancel" onClick={closeChangePassModal}/>
        </div>
      </Modal>
    </div>
  );
};
