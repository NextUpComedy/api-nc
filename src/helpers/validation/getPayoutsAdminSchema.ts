import Joi from 'joi';
import {
  limit, page, sortOptions, userPayoutStatuses,
} from '../validationRules';

export default Joi.object({
  limit,
  page,
  sort: sortOptions,
  status: userPayoutStatuses,
  userId: Joi.number().min(1),
});
