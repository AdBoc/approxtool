import {
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
import { apiService } from '../../grpc-web/apiService';
import { isApiError } from '../../utils/isApiError';
import styles from './styles.module.scss';

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
    if (isError(errors)) return;

    const {email, password} = loginForm;

    try {
      apiService.Login(email, password);
      history.push('/');
    } catch (err) {
      if (isApiError(err)) console.error(err.code, err.message);
    }
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
