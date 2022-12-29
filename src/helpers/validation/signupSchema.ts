import Joi from 'joi';
import { email, name, password } from '../validationRules';

export default Joi.object({
  name,
  email,
  password,
});
