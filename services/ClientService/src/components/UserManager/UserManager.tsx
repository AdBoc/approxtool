import React, {
  useEffect,
  useState
} from 'react';
import { Modal } from '../../common-components/Modal/Modal';
import { Button } from '../../common-components/Button/Button';
import styles from './styles.module.scss';
import { useModal } from '../../hooks/useModal';
import { RegisterForm } from '../RegisterForm';
import { mutateUser } from './UserManager.utils';
import { InputField } from '../../common-components/InputField/InputField';
import { User } from '../../types';
import {
  ChangePrivilegeRequest,
  DeleteUserRequest,
  Role,
  SearchRequest
} from '../../protos/userservice_pb';
import { roles } from '../../constants/constants';
import {
  apiSrv,
  fetchWithAuthRetry
} from '../../grpc-web';
import { token } from '../../utils/token';

export const UserManager: React.FC = (): JSX.Element => {
  const [userQuery, setUserQuery] = useState('');

  const {isShowing: isRegisterForm, toggle: toggleRegisterForm} = useModal();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      const request = new SearchRequest();
      request.setSearchquery(userQuery);

      const result = await fetchWithAuthRetry(() => {
        request.setAccesstoken(token.accessToken);
        return apiSrv.searchForUsers(request, null);
      });

      setUsers(result.toObject().usersList);
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
      setSelectedUser(null);
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
      setSelectedUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.usersWrapper}>
      <Button text="Add user" onClick={toggleRegisterForm}/>
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
        <Button text="Close" onClick={() => setSelectedUser(null)}/>
        <Button
          text="Delete user"
          className={styles.dangerousButton}
          onClick={() => handleDeleteUser(selectedUser!.id)}
        />
      </Modal>
      <Modal isShowing={isRegisterForm} className={styles.modalRegisterWrapper}>
        <RegisterForm setUsers={setUsers} handleClose={toggleRegisterForm}/>
      </Modal>
    </div>
  );
};

// TODO: PAGINATION?
