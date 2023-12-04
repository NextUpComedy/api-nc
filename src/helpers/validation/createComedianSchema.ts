import Joi from 'joi';
import { name, email } from '../validationRules';

export default Joi.object({
  name,
  email,
  type: Joi.number().required(),
});
