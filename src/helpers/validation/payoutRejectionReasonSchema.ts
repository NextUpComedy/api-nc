import Joi from 'joi';
import { stringValidation } from '../validationRules';

export default Joi.object({
  rejectionReason: stringValidation.required(),
});
