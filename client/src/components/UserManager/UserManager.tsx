import React, {
  useEffect,
  useState
} from 'react';
import { fetchUsers } from '../../temporary/sim-request/sim-request';
import { Modal } from '../../common-components/Modal/Modal';
import { Button } from '../../common-components/Button/Button';
import {
  ChangePrivilegeRequest,
  DeleteUserRequest,
  GetUserResponse,
  Role
} from '../../protos/user_pb';
import {
  roles,
  userMetadata,
  userSrv
} from '../../constants/constants';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import styles from './styles.module.scss';
import { useModal } from '../../hooks/useModal';
import { RegisterForm } from '../RegisterForm';
import { mutateUser } from './UserManager.utils';

export const UserManager: React.FC = (): JSX.Element => {
  const [userQuery, setUserQuery] = useState('');

  const {isShowing: isRegisterForm, toggle: toggleRegisterForm} = useModal();

  const [users, setUsers] = useState<GetUserResponse.AsObject[]>([]);
  const [selectedUser, setSelectedUser] = useState<GetUserResponse.AsObject | null>(null);

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      fetchUsers().then(users => setUsers(users));
    } else {
      const request = new Empty();
      userSrv.getAllUsers(request, userMetadata, (err, res) => {
        if (err) {
          console.log(err.code, err.message);
          return;
        }
        setUsers(res.toObject().usersList);
      });
    }
  }, []);

  const handleChangePrivilege = (userId: number) => {
    const request = new ChangePrivilegeRequest();
    request.setUserid(userId);
    request.setNewstatus(Role.ADMIN)
    userSrv.changeUserPrivilege(request, userMetadata, (err, _) => {
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
    userSrv.deleteUser(request, userMetadata, (err, _) => {
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
      {/*<InputField*/}
      {/*  label="Search by username/email:"*/}
      {/*  value={userQuery}*/}
      {/*  handler={e => setUserQuery(e.target.value)}*/}
      {/*/>*/}
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

// TODO: Implement search XD?
// TODO: PAGINATION XD
