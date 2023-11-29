import Joi from 'joi';
import { idValidation, stringValidation, booleanValidation } from '../validationRules';

export default Joi.object({
  id: idValidation,
  name: stringValidation,
  image: stringValidation,
  videoNotification: booleanValidation,
  paymentNotification: booleanValidation,
  password: stringValidation,
});
