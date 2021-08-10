import React, { useState } from 'react';
import { Modal } from '../../../common-components/Modal/Modal';
import { Role } from '../../../types';
import { token } from '../../../utils/token';
import { apiService } from '../../../grpc-web/apiService';
import { mutateUser } from '../UserManager.utils';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { UserResponse } from '../../../protos/userservice_pb';
import { Button } from '../../../common-components/Button/Button';
import { InputField } from '../../../common-components/InputField/InputField';
import styles from './styles.module.scss';

interface Props {
  users: UserResponse.AsObject[];
  setUsers: React.Dispatch<React.SetStateAction<UserResponse.AsObject[]>>;
  selectedUser: UserResponse.AsObject | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserResponse.AsObject | null>>;
}

export const UserOperations: React.FC<Props> = ({users, selectedUser, setUsers, setSelectedUser}): JSX.Element => {
  const [passwordInput, setPasswordInput] = useState<boolean | string>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const isMounted = useIsMounted();

  const handleChangePrivilege = async (userId: number) => {
    try {
      await apiService.ChangeUserPrivilege(userId);
      if (isMounted()) {
        setUsers(mutateUser.changePrivilege(users, userId));
        setSelectedUser(null);
      }
    } catch (err) {
      console.error(err.code, err.message);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await apiService.DeleteUser(userId);
      if (isMounted()) {
        setUsers(mutateUser.deleteUser(users, userId));
        setSelectedUser(null);
      }
    } catch (err) {
      console.error(err.code, err.message);
    }
  };

  const handleChangePassword = async (userId: number) => {
    if (typeof passwordInput !== 'string' || passwordInput.length < 6) return;

    try {
      await apiService.ChangePassword(userId, passwordInput);
      if (isMounted()) {
        closeChangePassModal();
        setSelectedUser(null);
      }
    } catch (err) {
      console.error(err.code, err.message);
    }
  };

  const openChangePassModal = (userId: number) => {
    setUserId(userId);
    setPasswordInput(true);
  };

  const closeChangePassModal = () => {
    setPasswordInput(false);
    setUserId(null);
  };

  return (
    <Modal isShowing={Boolean(selectedUser)}>
      <div>
        {selectedUser?.role === Role.USER && (
          <Button type="button" text="Give Admin" onClick={() => handleChangePrivilege(selectedUser.id)}/>
        )}
        <Button type="button" text="Change Password" onClick={() => openChangePassModal(selectedUser!.id)}/>
        {token.decodedTokenData.user_id !== selectedUser?.id && (
          <Button type="button" text="Delete" onClick={() => handleDeleteUser(selectedUser!.id)}/>
        )}
      </div>
      <Button text="Close" onClick={() => setSelectedUser(null)}/>
      <Modal isShowing={Boolean(passwordInput)}>
        <form className={styles.passwordForm} onSubmit={e => e.preventDefault()}>
          <input type="text" autoComplete="username" hidden/>
          <InputField
            type="password"
            label="New Password"
            autoComplete="new-password"
            handler={(e) => setPasswordInput(e.target.value)}
          />
          <p>Password must have 6 min characters</p>
          <Button type="submit" text="Send" onClick={() => handleChangePassword(userId!)}/>
          <Button type="button" text="Cancel" onClick={closeChangePassModal}/>
        </form>
      </Modal>
    </Modal>
  );
};

