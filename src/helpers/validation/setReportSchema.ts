import Joi from 'joi';
import { date, positiveNumber } from '../validationRules';

export default Joi.object({
  watchTimeTo: date.required(),
  totalRevenue: positiveNumber,
});
