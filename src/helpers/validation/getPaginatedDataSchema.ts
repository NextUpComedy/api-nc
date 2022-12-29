import Joi from 'joi';
import {
  limit, page, stringValidation, guid,
} from '../validationRules';

export default Joi.object({
  limit,
  page,
  title: stringValidation,
  id: guid,
});
