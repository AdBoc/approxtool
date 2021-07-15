import {
  GetUserResponse,
  Role
} from '../../protos/user_pb';

class MutateUser {
  deleteUser(users: GetUserResponse.AsObject[], deletedUserId: number) {
    return users.filter(({id}) => id !== deletedUserId);
  };

  changePrivilege(users: GetUserResponse.AsObject[], userId: number) {
    return users.map(user => {
      if (user.id === userId) return {...user, status: Role.ADMIN};
      return user;
    });
  };

  addUser(users: GetUserResponse.AsObject[], newUser: GetUserResponse.AsObject) {
    return [...users, newUser];
  }
}

export const mutateUser = new MutateUser();