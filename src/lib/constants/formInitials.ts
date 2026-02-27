import { UserType } from '../types';
import type { SignupFormData } from '../utils/schema';

export const genericFields = {
  email: '',
  password: '',
};

export const signUpDefaultValuesCustomer: SignupFormData = {
  ...genericFields,
  username: '',
  role: UserType.CUSTOMER,
};

export const loginDefaultValues = genericFields;
