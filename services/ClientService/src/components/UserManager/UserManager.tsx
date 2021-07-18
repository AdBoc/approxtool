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
import {
  apiSrv,
  roles
} from '../../constants/constants';

export const UserManager: React.FC = (): JSX.Element => {
  const [userQuery, setUserQuery] = useState('');

  const {isShowing: isRegisterForm, toggle: toggleRegisterForm} = useModal();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const request = new SearchRequest();
    request.setSearchquery(userQuery);
    apiSrv.searchForUsers(request, null, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      setUsers(res.toObject().usersList);
    });
  }, [userQuery]);

  const handleChangePrivilege = (userId: number) => {
    const request = new ChangePrivilegeRequest();
    request.setUserid(userId);
    request.setNewstatus(Role.ADMIN)
    apiSrv.changeUserPrivilege(request, null, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      setUsers(mutateUser.changePrivilege(users, userId));
      setSelectedUser(null);
    });
  };

  const handleDeleteUser = (userId: number) => {
    const request = new DeleteUserRequest();
    request.setId(userId);
    apiSrv.deleteUser(request, null, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      //mutate state
      setUsers(mutateUser.deleteUser(users, userId));
      setSelectedUser(null);
    });
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
