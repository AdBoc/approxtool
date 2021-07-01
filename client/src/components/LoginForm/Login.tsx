import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import { useHistory, } from 'react-router-dom';
import { Modal } from '../../common-components/Modal/Modal';
import { useModal } from '../../hooks/useModal';
import { PasswordReset } from './PasswordReset/PasswordReset';
import { InputField } from '../../common-components/InputField/InputField';
import {
  initialLoginState,
  initialRegisterState,
  isError,
  validateLoginForm,
  validateRegisterForm
} from './Login.utils';
import styles from './styles.module.scss';
import {
  CompareCredentialsRequest,
  NewUserRequest,
  Role
} from '../../protos/user_pb';
import {
  userMetadata,
  userSrv
} from '../../constants/constants';

export const Login = () => {
  const history = useHistory();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [registerForm, setRegisterForm] = useState(initialRegisterState);

  const [loginErrors, setLoginErrors] = useState(initialLoginState);
  const [registerErrors, setRegisterErrors] = useState(initialRegisterState);

  const {isShowing, toggle} = useModal();

  const handleLoginInput = (e: BaseSyntheticEvent) => setLoginForm(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));

  const handleRegisterInput = (e: BaseSyntheticEvent) => setRegisterForm(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));

  const handleLogin = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const errors = validateLoginForm(loginErrors, loginForm);
    if (isError(Object.entries(errors))) return setLoginErrors(errors);

    const request = new CompareCredentialsRequest();
    request.setEmail(loginForm.email);
    request.setPassword(loginForm.password);
    userSrv.compareCredentials(request, userMetadata, (err, _) => {
      if (err) {
        console.error(err.code, err.message);
        return;
      }
    });

    localStorage.setItem('token', 'token');
    history.push('/');
  };

  const handleRegister = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const errors = validateRegisterForm(registerErrors, registerForm);
    if (isError(Object.entries(errors))) return setRegisterErrors(errors);

    const request = new NewUserRequest();
    request.setUsername(registerForm.name);
    request.setEmail(registerForm.email);
    request.setPassword(registerForm.password);
    request.setStatus(Role.BASIC_USER);
    userSrv.createUser(request, userMetadata, (err, _) => {
      if (err) {
        console.error(err.code, err.message);
        return;
      }
    });

    localStorage.setItem('token', 'token');
    history.push('/');
  };

  const handleFormTypeToggle = () => {
    setIsLoginForm(prev => !prev);
    setRegisterForm(initialRegisterState);
    setLoginForm(initialLoginState);
    setLoginErrors(initialLoginState);
    setRegisterErrors(initialRegisterState);
  };

  if (isLoginForm) return (
    <>
      <form className={styles.formWrapper} onSubmit={handleLogin}>
        <h2 className={styles.formText}>Login</h2>
        <div className={styles.inputWrapper}>
          <InputField label="Email" name="email" value={loginForm.email} handler={handleLoginInput}/>
          {loginErrors.email && <p className={styles.validationError}>{loginErrors.email}</p>}
          <InputField label="Password" type="password" name="password" value={loginForm.password} handler={handleLoginInput} autoComplete="on"/>
          {loginErrors.password && <p className={styles.validationError}>{loginErrors.password}</p>}
          <div className={styles.buttonsWrapper}>
            <button type="submit" className={styles.button}>Login</button>
            <button type="button" className={styles.button} onClick={handleFormTypeToggle}>Signup</button>
            <button type="button" className={styles.resetPassword} onClick={toggle}>Reset password</button>
          </div>
        </div>
      </form>
      <Modal isShowing={isShowing} className={styles.passwordResetModal}>
        <PasswordReset toggle={toggle}/>
      </Modal>
    </>
  );

  return (
    <form className={styles.formWrapper} onSubmit={handleRegister}>
      <h2 className={styles.formText}>Register</h2>
      <div className={styles.inputWrapper}>
        <InputField label="Email" name="email" value={registerForm.email} handler={handleRegisterInput}/>
        {registerErrors.email && <p className={styles.validationError}>{registerErrors.email}</p>}
        <InputField label="Name" name="name" value={registerForm.name} handler={handleRegisterInput}/>
        {registerErrors.name && <p className={styles.validationError}>{registerErrors.name}</p>}
        <InputField label="Password" type="password" name="password" value={registerForm.password} handler={handleRegisterInput} autoComplete="on"/>
        {registerErrors.password && <p className={styles.validationError}>{registerErrors.password}</p>}
        <InputField label="Confirm password" type="password" name="confirmPassword" value={registerForm.confirmPassword}
                    handler={handleRegisterInput} autoComplete="on"/>
        {registerErrors.confirmPassword && <p className={styles.validationError}>{registerErrors.confirmPassword}</p>}
        <div className={styles.buttonsWrapper}>
          <button type="submit" className={styles.button}>Create account</button>
          <button type="button" className={styles.button} onClick={handleFormTypeToggle}>Login</button>
        </div>
      </div>
    </form>
  );
};

//TODO: SPLIT LOGIN AND REGISTER LOGIC MORE
