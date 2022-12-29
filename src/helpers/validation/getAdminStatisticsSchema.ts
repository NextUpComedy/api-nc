import Joi from 'joi';
import { date, page } from '../validationRules';

export default Joi.object().keys({
  fromDate: date,
  toDate: date,
  page,
  limit: page,
}).and('toDate', 'fromDate');
