import React, {
  BaseSyntheticEvent,
  useState
} from 'react';
import { useHistory, } from 'react-router-dom';
import { InputField } from '../../common-components/InputField/InputField';
import {
  initialLoginState,
  isError,
  validateLoginForm
} from './Login.utils';
import styles from './styles.module.scss';
import { CompareCredentialsRequest } from '../../protos/userservice_pb';
import { apiSrv } from '../../constants/constants';

export const Login = () => {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [loginErrors, setLoginErrors] = useState(initialLoginState);

  const handleLoginInput = (e: BaseSyntheticEvent) => setLoginForm(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));

  const handleLogin = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const errors = validateLoginForm(loginErrors, loginForm);
    setLoginErrors(errors);
    if (isError(Object.entries(errors))) return;

    const request = new CompareCredentialsRequest();
    request.setEmail(loginForm.email);
    request.setPassword(loginForm.password);
    apiSrv.login(request, null, (err, res) => {
      if (err) {
        console.error(err.code, err.message);
        return;
      }
      console.log(res.toObject().authToken);
      // localStorage.setItem('token', 'token');
      // history.push('/');
    });
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleLogin}>
      <h2 className={styles.formText}>Login</h2>
      <div className={styles.inputWrapper}>
        <InputField
          label="Email"
          name="email"
          value={loginForm.email}
          handler={handleLoginInput}
        />
        {loginErrors.email && <p className={styles.validationError}>{loginErrors.email}</p>}
        <InputField
          label="Password"
          type="password"
          name="password"
          value={loginForm.password}
          handler={handleLoginInput}
          autoComplete="on"
        />
        {loginErrors.password && <p className={styles.validationError}>{loginErrors.password}</p>}
        <div className={styles.buttonsWrapper}>
          <button type="submit" className={styles.button}>Login</button>
        </div>
      </div>
    </form>
  );
};
