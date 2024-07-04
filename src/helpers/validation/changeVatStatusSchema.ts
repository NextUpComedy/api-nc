import Joi from 'joi';
import {
  positiveNumber,
} from '../validationRules';

export default Joi.object({
  id: positiveNumber.required(),
  vat: Joi.boolean().required(),
});
