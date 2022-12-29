import Joi from 'joi';
import { stringValidation, passwordRef, confirmPassword } from '../validationRules';

export default Joi.object({
  oldPassword: stringValidation.required(),
  password: passwordRef,
  confirm: confirmPassword,
});
