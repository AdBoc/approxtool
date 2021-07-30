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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [renderPasswordInput, setRenderPasswordInput] = useState<boolean | string>(false);

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
      handleCloseModal();
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
      handleCloseModal();
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

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
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
      {users.map((user) => (
        <div key={user.id} className={styles.user} onClick={() => setSelectedUser(user)}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Status: {roles[user.status]}</p>
        </div>
      ))}
      <Modal isShowing={Boolean(selectedUser)}>
        {selectedUser?.status === Role.BASIC_USER &&
        <Button text="Give admin role" onClick={() => handleChangePrivilege(selectedUser!.id)}/>}
        {renderPasswordInput ? (
          <div className={styles.passwordForm}>
            <InputField label="New Password" handler={(e) => setRenderPasswordInput(e.target.value)}/>
            <p>Password must have 6 min characters</p>
            <Button type="submit" text="Send" onClick={() => handleChangePassword(selectedUser!.id)}/>
          </div>
        ) : (
          <Button type="button" text="Change Password" onClick={() => setRenderPasswordInput(prev => !prev)}/>
        )}
        <Button type="button" text="Close Modal" onClick={handleCloseModal}/>
        {token.decodedTokenData.user_id !== selectedUser!.id && <Button
          text="Delete user"
          className={styles.dangerousButton}
          onClick={() => handleDeleteUser(selectedUser!.id)}
        />}
      </Modal>
      <Modal isShowing={isRegisterForm} className={styles.modalRegisterWrapper}>
        <RegisterForm setUsers={setUsers} handleClose={toggleRegisterForm}/>
      </Modal>
    </div>
  );
};

