import Joi from 'joi';
import {
  idValidation, positiveNumber, date, otherRevenueJOI,
} from '../validationRules';

export default Joi.object({
  id: positiveNumber.required(),
  userId: idValidation,
  filmingCosts: positiveNumber,
  launchDate: date.required(),
  advance: positiveNumber,
  feePaid: positiveNumber,
  recoveredCosts: positiveNumber,
  otherRevenue: otherRevenueJOI,
  notes: Joi.string(),
});
