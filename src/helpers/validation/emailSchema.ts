import Joi from 'joi';
import { email } from '../validationRules';

export default Joi.object({
  email,
});
