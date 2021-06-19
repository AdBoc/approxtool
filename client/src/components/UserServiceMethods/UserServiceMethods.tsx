import React from 'react';
import { gRPCClients } from '../../gRPCClients';
import {
  NewUserRequest,
  Role,
  UserId,
  UserPrivilegeRequest
} from '../../protos/user_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

const userSrv = gRPCClients.userServiceClient;
const metadata = {"service-header": "user_service"};

export const UserServiceMethods = () => {
  const handleGetUser = () => {
    const request = new UserId();
    request.setId(2);
    userSrv.getUser(request, metadata, (err, res) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log(res.toObject().id);
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
    });
  };

  const handleCreateUser = () => {
    const request = new NewUserRequest();
    request.setLogin('login');
    request.setPassword('password');
    request.setRole(Role.BASIC_USER);
    userSrv.createUser(request, metadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log('FRONT: create user');
    });
  };

  const handleDeleteUser = () => {
    const request = new UserId();
    request.setId(1);
    userSrv.deleteUser(request, metadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log('FRONT: delete user');
    });
  };

  const handleChangePrivileges = () => {
    const request = new UserPrivilegeRequest();
    request.setUserid(new UserId().setId(2)); // TODO: Really?
    request.setNewrole(Role.BASIC_USER);
    userSrv.changeUserPrivilege(request, metadata, (err, _) => {
      if (err) {
        console.log(err.code, err.message);
        return;
      }
      console.log('FRONT: change privilege');
    });
  };

  return (
    <div>
      <button type="button" onClick={handleGetUser}>Get user</button>
      <button type="button" onClick={handleGetUsers}>Get users</button>
      <button type="button" onClick={handleCreateUser}>Create user</button>
      <button type="button" onClick={handleDeleteUser}>Delete user</button>
      <button type="button" onClick={handleChangePrivileges}>Change privileges</button>
    </div>
  );
};