import React, { useState } from 'react';
import { emailRegex } from '../../../constants/constants';
import { InputField } from '../../../common-components/InputField/InputField';
import styles from './styles.module.scss';

interface Props {
  toggle: () => void;
}

export const PasswordReset: React.FC<Props> = ({toggle}): JSX.Element => {
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    if (emailRegex.test(email)) console.error('Unimplemented');
    toggle();
  }

  return (
    <>
      <h2 className={styles.text}>Email with password reset link will be sent to passed email</h2>
      <InputField label="Email" value={email} handler={e => setEmail(e.target.value)}/>
      <button className={styles.button} type="submit" onClick={handleSendEmail}>Send email</button>
      <button className={styles.button} type="button" onClick={toggle}>Close</button>
    </>
  );
};
