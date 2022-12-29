import Joi from 'joi';
import { password } from '../validationRules';

export default Joi.object({
  password,
});
