import Joi from 'joi';
import {
  idValidation, positiveNumber, date, guid,
} from '../validationRules';

export default Joi.object({
  id: positiveNumber.required(),
  userId: idValidation,
  filmingCosts: positiveNumber,
  launchDate: date.required(),
  advance: positiveNumber,
  feePaid: positiveNumber,
  recoveredCosts: positiveNumber,
});
