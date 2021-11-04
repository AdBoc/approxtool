import { emailRegex } from '../../constants/constants';
import {
  GenericObject,
  LoginForm,
  RegisterForm
} from '../../types';

export const initialLoginState = {
  email: '',
  password: '',
};

export const initialRegisterState = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
}

export function validateLoginForm(prevErrors: LoginForm, form: LoginForm) {
  const errors = {...prevErrors};

  if (!emailRegex.test(form.email)) errors.email = 'Insert proper email'
  else errors.email = '';

  if (form.password.length < 6) errors.password = 'Min 6 characters required';
  else errors.password = '';

  return errors;
}

export function validateRegisterForm(prevErrors: RegisterForm, form: RegisterForm) {
  const errors = {...prevErrors};

  if (!emailRegex.test(form.email)) errors.email = 'Insert proper email'
  else errors.email = '';

  if (form.name.length < 3) errors.name = 'Name field is required'
  else errors.name = '';

  if (form.password.length < 6) errors.password = 'Min 6 characters required';
  else errors.password = '';

  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords are different'
  else errors.confirmPassword = '';

  return errors;
}

export function isError(errors: GenericObject<string>) {
  for (const errorMessage of Object.values(errors)) {
    if (errorMessage) return true;
  }
  return false;
}