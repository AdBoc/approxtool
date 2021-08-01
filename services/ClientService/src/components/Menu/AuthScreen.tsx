import { Login } from '../LoginForm';
import styles from './styles.module.scss';

export const AuthScreen = () => (
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
