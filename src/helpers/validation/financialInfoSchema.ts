import Joi from 'joi';
import { stringValidation } from '../validationRules';

export default Joi.object({
  name: stringValidation.required(),
  address: stringValidation.required(),
  method: stringValidation,
});
