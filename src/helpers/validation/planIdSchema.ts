import Joi from 'joi';
import { guid } from '../validationRules';

export default Joi.object({
  planId: guid,
});
