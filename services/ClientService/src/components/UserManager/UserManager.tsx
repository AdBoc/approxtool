import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Modal } from '../../common-components/Modal/Modal';
import { Button } from '../../common-components/Button/Button';
import { useModal } from '../../hooks/useModal';
import { RegisterForm } from '../RegisterForm';
import { InputField } from '../../common-components/InputField/InputField';
import { User } from '../../types';
import { fetchTempUsers } from '../../temporary/sim-request/sim-request';
import { apiService } from '../../grpc-web/apiService';
import { useIsMounted } from '../../hooks/useIsMounted';
import { UserOperations } from './Operations';
import { UserResponse } from '../../protos/userservice_pb';
import styles from './styles.module.scss';

export const UserManager: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  const [userQuery, setUserQuery] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserResponse.AsObject | null>(null);

  const isMounted = useIsMounted();
  const {isShowing: isRegisterForm, toggle: toggleRegisterForm} = useModal();

  const observer = useRef<IntersectionObserver>();

  const lastUserElement = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting && hasMore) {
        const maxId = users[users.length - 1].id;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          fetchTempUsers().then(users => {
            if (isMounted()) setUsers(users);
          });
        } else {
          try {
            setLoading(true);
            const response = await apiService.SearchForUsers(userQuery, maxId);
            if (isMounted()) {
              const usersList = response.toObject().usersList
              if (usersList.length < 5) setHasMore(false);
              setUsers([...users, ...usersList]);
            }
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }
      }
    });
    if (node) observer.current?.observe(node);
  }, [loading, hasMore, users, isMounted, userQuery]);

  useEffect(() => {
    async function fetchUsers(keySetVal?: number) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        fetchTempUsers().then(users => {
          if (isMounted()) setUsers(users);
        });
      } else {
        try {
          setLoading(true);
          const response = await apiService.SearchForUsers(userQuery, keySetVal || 0);
          if (isMounted()) {
            const usersList = response.toObject().usersList
            if (usersList.length === 5) setHasMore(true);
            setUsers(usersList);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchUsers();
  }, [userQuery, isMounted]);

  return (
    <div className={styles.usersWrapper}>
      <InputField
        label="Search by username:"
        value={userQuery}
        handler={e => setUserQuery(e.target.value)}
      />
      <section className={styles.tableWrapper}>
        <div className={`${styles.tableRow} ${styles.tableHeader}`}>
          <p>Username</p>
          <p>Email</p>
          <p>Status</p>
          <p>Operations</p>
        </div>
        {users.map((user, index) => (
          <div key={user.id} ref={users.length === index + 1 ? lastUserElement : null} className={styles.tableRow}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <button type="button" className={styles.operation} onClick={() => setSelectedUser(user)}>Operations</button>
          </div>
        ))}
      </section>
      <Button className={styles.addButton} type="button" text="Add user" onClick={toggleRegisterForm}/>
      <Modal isShowing={isRegisterForm} className={styles.modalRegisterWrapper}>
        <RegisterForm setUsers={setUsers} handleClose={toggleRegisterForm}/>
      </Modal>
      <UserOperations
        users={users}
        selectedUser={selectedUser}
        setUsers={setUsers}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};
