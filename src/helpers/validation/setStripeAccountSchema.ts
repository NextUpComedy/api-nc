import Joi from 'joi';
import { idValidation, stripeAccountValidation } from '../validationRules';

export default Joi.object({
  userId: idValidation,
  stripeAccount: stripeAccountValidation,
});
