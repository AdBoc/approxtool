import { Redirect } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { token } from '../../utils/token';
import { Login } from '../LoginForm';
import styles from './styles.module.scss';

export const AuthView = () => token.accessToken 
? <Redirect to={ROUTES.root}/> 
: (
  <div className={styles.welcomeWrapper}>
    <div className={styles.welcomeText}>
      <div className={styles.descriptionText}>
        <h1>Curve fit</h1>
        <p>Tool allows to save models and use them for curve fitting purposes.</p>
      </div>
    </div>
    <Login />
  </div>
);
