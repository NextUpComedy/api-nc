import Joi from 'joi';
import { idValidation } from '../validationRules';

export default Joi.object({
  userId: idValidation,
});
