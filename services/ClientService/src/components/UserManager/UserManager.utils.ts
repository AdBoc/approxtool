import {
  Role,
  User
} from '../../types';

class MutateUser {
  deleteUser(users: User[], deletedUserId: number) {
    return users.filter(({id}) => id !== deletedUserId);
  };

  changePrivilege(users: User[], userId: number) {
    return users.map(user => {
      if (user.id === userId) return {...user, status: Role.ADMIN};
      return user;
    });
  };

  addUser(users: User[], newUser: User) {
    return [...users, newUser];
  }
}

export const mutateUser = new MutateUser();