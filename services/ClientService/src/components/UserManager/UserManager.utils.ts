import { Role } from '../../constants/role';
import { User } from '../../types';

class MutateUser {
  deleteUser(users: User[], deletedUserId: number) {
    return users.filter(({id}) => id !== deletedUserId);
  };

  changePrivilege(users: User[], userId: number) {
    return users.map(user => user.id === userId ? {...user, role: Role.ADMIN} : user);
  };

  addUser(users: User[], newUser: User) {
    return [...users, newUser];
  };
}

export const mutateUser = new MutateUser();