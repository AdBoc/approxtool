import React, {
  useEffect,
  useState
} from 'react';
import { InputField } from '../../common-components/InputField/InputField';
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

export const UserManager: React.FC = (): JSX.Element => {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState<GetUserResponse.AsObject[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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
        console.log(res.toObject().usersList);
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
    });
  };

  return (
    <div className={styles.usersWrapper}>
      <InputField
        label="Search by username/email:"
        value={userQuery}
        handler={e => setUserQuery(e.target.value)}
      />
      {users.map((user) => (
        <div key={user.id} className={styles.user} onClick={() => setSelectedUserId(user.id)}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Status: {roles[user.status]}</p>
        </div>
      ))}
      <Modal isShowing={Boolean(selectedUserId)}>
        <Button text="Give admin role" onClick={() => handleChangePrivilege(selectedUserId!)}/>
        <Button text="Close" onClick={() => setSelectedUserId(null)}/>
        <Button text="Delete user" className={styles.dangerousButton} onClick={() => handleDeleteUser(selectedUserId!)}/>
      </Modal>
    </div>
  );
};

// TODO: Implement search XD?
// TODO: PAGINATION XD
