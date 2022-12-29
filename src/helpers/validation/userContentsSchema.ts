import Joi from 'joi';
import { page } from '../validationRules';

export default Joi.object({
  page,
  limit: page,
});
