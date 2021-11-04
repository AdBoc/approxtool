import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import {
  initialRegisterState,
  isError,
  validateRegisterForm
} from '../LoginForm/Login.utils';
import { InputField } from '../../common-components/InputField/InputField';
import styles from './styles.module.scss';
import { Button } from '../../common-components/Button/Button';
import { mutateUser } from '../UserManager/UserManager.utils';
import { User } from '../../types';
import { apiService } from '../../grpc-web/apiService';
import { useIsMounted } from '../../hooks/useIsMounted';

interface Props {
  handleClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const RegisterForm: React.FC<Props> = ({handleClose, setUsers}): JSX.Element => {
  const [registerForm, setRegisterForm] = useState(initialRegisterState);
  const [registerErrors, setRegisterErrors] = useState(initialRegisterState);

  const isMounted = useIsMounted();

  const handleRegisterInput = (e: BaseSyntheticEvent) => setRegisterForm(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));

  const handleRegister = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const {email, name, password} = registerForm;

    const errors = validateRegisterForm(registerErrors, registerForm);
    setRegisterErrors(errors);
    if (isError(errors)) return;

    try {
      const response = await apiService.CreateUser(name, email, password);
      if (isMounted()) {
        setUsers(prev => mutateUser.addUser(prev, response.toObject()));
        handleClose();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleRegister}>
      <h2 className={styles.formText}>New User</h2>
      <div className={styles.inputWrapper}>
        <InputField
          label="Email"
          name="email"
          autoComplete="email"
          value={registerForm.email}
          handler={handleRegisterInput}
        />
        {registerErrors.email && <p className={styles.validationError}>{registerErrors.email}</p>}
        <InputField
          label="Name"
          name="name"
          autoComplete="username"
          value={registerForm.name}
          handler={handleRegisterInput}
        />
        {registerErrors.name && <p className={styles.validationError}>{registerErrors.name}</p>}
        <InputField
          label="Password"
          type="password"
          name="password"
          value={registerForm.password}
          handler={handleRegisterInput}
          autoComplete="new-password"
        />
        {registerErrors.password && <p className={styles.validationError}>{registerErrors.password}</p>}
        <InputField
          label="Confirm password"
          type="password"
          name="confirmPassword"
          value={registerForm.confirmPassword}
          handler={handleRegisterInput}
          autoComplete="on"
        />
        {registerErrors.confirmPassword && <p className={styles.validationError}>{registerErrors.confirmPassword}</p>}
        <Button text="Create account" type="submit"/>
        <Button text="Close" onClick={handleClose}/>
      </div>
    </form>
  );
};