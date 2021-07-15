import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import {
  initialRegisterState,
  isError,
  validateRegisterForm
} from '../LoginForm/Login.utils';
import {
  GetUserResponse,
  NewUserRequest,
  Role
} from '../../protos/user_pb';
import {
  userMetadata,
  userSrv
} from '../../constants/constants';
import { InputField } from '../../common-components/InputField/InputField';
import styles from './styles.module.scss';
import { Button } from '../../common-components/Button/Button';
import { mutateUser } from '../UserManager/UserManager.utils';

interface Props {
  handleClose: () => void;
  setUsers?: React.Dispatch<React.SetStateAction<GetUserResponse.AsObject[]>>;
}

export const RegisterForm: React.FC<Props> = ({handleClose, setUsers}): JSX.Element => {
  const [registerForm, setRegisterForm] = useState(initialRegisterState);
  const [registerErrors, setRegisterErrors] = useState(initialRegisterState);

  const handleRegisterInput = (e: BaseSyntheticEvent) => setRegisterForm(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));

  const handleRegister = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const errors = validateRegisterForm(registerErrors, registerForm);
    setRegisterErrors(errors);
    if (isError(Object.entries(errors))) return;

    const request = new NewUserRequest();
    request.setUsername(registerForm.name);
    request.setEmail(registerForm.email);
    request.setPassword(registerForm.password);
    request.setStatus(Role.BASIC_USER);
    userSrv.createUser(request, userMetadata, (err, res) => {
      if (err) {
        console.error(err.code, err.message);
        return;
      }
      if (setUsers) setUsers(prev => mutateUser.addUser(prev, res.toObject()));
      handleClose();
    });
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleRegister}>
      <h2 className={styles.formText}>Register</h2>
      <div className={styles.inputWrapper}>
        <InputField
          label="Email"
          name="email"
          value={registerForm.email}
          handler={handleRegisterInput}
        />
        {registerErrors.email && <p className={styles.validationError}>{registerErrors.email}</p>}
        <InputField
          label="Name"
          name="name"
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
          autoComplete="on"
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