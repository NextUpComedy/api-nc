import Joi from 'joi';
import { name, email, idValidation } from '../validationRules';

export default Joi.object({
  name,
  email,
  roleId: idValidation,
});
