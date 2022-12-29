import Joi from 'joi';

export default Joi.object().pattern(Joi.string().guid(), Joi.number());
