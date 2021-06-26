import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import { gRPCClients } from '../../gRPCClients';
import {
  DeleteUserRequest,
  GetUserRequest,
  GetUserResponse,
  NewUserRequest,
  Role,
} from '../../protos/user_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import styles from './styles.module.css';

const userSrv = gRPCClients.userServiceClient;
const metadata = {'service-header': 'user_service'};

export const UserServiceMethods = () => {
  const [user, setUser] = useState<GetUserResponse.AsObject>();
  const [users, setUsers] = useState<GetUserResponse.AsObject[]>([]);

  const [searchedUserId, setSearchedUserId] = useState('');
  const [loginForm, setLoginForm] = useState({
    login: '',
    password: '',
    email: '',
  });

  const handleGetUser = () => {
    const parsedUserId = parseInt(searchedUserId)
    if (!searchedUserId || isNaN(parsedUserId)) return;
    const request = new GetUserRequest();
    request.setId(parsedUserId);
    userSrv.getUser(request, metadata, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log(res.toObject().username);
      setUser(res.toObject());
    });
  };

  const handleGetUsers = () => {
    const request = new Empty();
    userSrv.getAllUsers(request, metadata, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log(res.toObject().usersList);
      setUsers(res.toObject().usersList);
    });
  };

  const handleCreateUser = () => {
    const request = new NewUserRequest();
    request.setLogin(loginForm.login);
    request.setPassword(loginForm.password);
    request.setEmail(loginForm.email);
    request.setRole(Role.BASIC_USER);
    userSrv.createUser(request, metadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
    });
  };

  const handleDeleteUser = (e: BaseSyntheticEvent) => {
    const request = new DeleteUserRequest();
    request.setId(parseInt(e.target.value));
    userSrv.deleteUser(request, metadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
    });
  };

  // const handleChangePrivileges = () => {
  //   const request = new ChangePrivilegeRequest();
  //   request.setUserid(2);
  //   request.setNewrole(Role.BASIC_USER);
  //   userSrv.changeUserPrivilege(request, metadata, (err, _) => {
  //     if (err) {
  //       console.log(err.code, err.message);
  //       return;
  //     }
  //     console.log('FRONT: change privilege');
  //   });
  // };

  const handleInputChange = (e: BaseSyntheticEvent) => {
    setLoginForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div>
      <h1>User service</h1>
      <div className={styles.elementsWrapper}>
        <div className={styles.elementWrapper}>
          <label>
            User Id
            <input
              type="text"
              value={searchedUserId}
              onChange={(e: BaseSyntheticEvent) => setSearchedUserId(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleGetUser}>Get user by ID</button>
        </div>
        <div className={styles.elementWrapper}>
          <button type="button" onClick={handleGetUsers}>Get users</button>
        </div>
        <div className={styles.elementWrapper}>
          <label>
            Username
            <input name="login" value={loginForm.login} onChange={handleInputChange}/>
          </label>
          <label>
            Email
            <input name="email" value={loginForm.email} onChange={handleInputChange}/>
          </label>
          <label>
            Password
            <input name="password" value={loginForm.password} onChange={handleInputChange}/>
          </label>
          <button type="button" onClick={handleCreateUser}>Create user</button>
        </div>
      </div>
      <div>
        <h2>User</h2>
        {user && <div>
            <p>{user.username}</p>
        </div>}
      </div>
      <div>
        <h2>Users</h2>
        {users.map((user) => (
            <div key={user.id}>
              <p>{user.username}</p>
              <button value={user.id} type="button" onClick={handleDeleteUser}>Delete user</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};