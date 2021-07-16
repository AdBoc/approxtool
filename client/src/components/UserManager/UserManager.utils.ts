import {
  Role,
  User
} from '../../protos/user_pb';

class MutateUser {
  deleteUser(users: User.AsObject[], deletedUserId: number) {
    return users.filter(({id}) => id !== deletedUserId);
  };

  changePrivilege(users: User.AsObject[], userId: number) {
    return users.map(user => {
      if (user.id === userId) return {...user, status: Role.ADMIN};
      return user;
    });
  };

  addUser(users: User.AsObject[], newUser: User.AsObject) {
    return [...users, newUser];
  }
}

export const mutateUser = new MutateUser();