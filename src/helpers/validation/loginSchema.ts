import Joi from 'joi';
import { email, password } from '../validationRules';

export default Joi.object({
  email,
  password,
});
