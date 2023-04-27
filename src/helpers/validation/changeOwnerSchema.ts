import Joi from 'joi';
import {
  idValidation, positiveNumber,
} from '../validationRules';

export default Joi.object({
  id: positiveNumber.required(),
  oldUserId: idValidation,
  newUserId: idValidation,
});
