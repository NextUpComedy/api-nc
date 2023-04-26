import Joi from 'joi';

const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,10}$/;

export const email = Joi.string().min(5).max(255).email()
  .regex(RegExp(EMAIL_REGEX))
  .rule({ message: 'You must enter a valid Email' })
  .required();

export const name = Joi.string()
  .required().messages({ 'string.empty': 'name cannot be empty', 'any.required': 'name is required' });

export const password = Joi.string().$.min(6).max(33)
  .rule({ message: 'Password length must be between 6 and 33 characters' })
  .required();

export const idValidation = Joi.number().min(1).required();

export const stringValidation = Joi.string();

export const booleanValidation = Joi.boolean();

export const limit = Joi.number().min(1).max(1000);

export const page = Joi.number().min(1);

export const positiveNumber = Joi.number().min(0).required();

export const percentageNumber = Joi.number().min(0).max(1).required();

export const date = Joi.string().isoDate();

export const guid = Joi.string().guid();

export const otherRevenueJOI = Joi.array().required();

export const passwordRef = Joi.string().invalid(Joi.ref('oldPassword')).messages({ 'any.invalid': "New password shouldn't be the same as the old one" }).required();

export const confirmPassword = Joi.ref('password');

export const uri = Joi.string().uri().required();

export const sortOptions = Joi.string().valid('asc', 'desc').insensitive();

export const userPayoutStatuses = Joi.string().valid('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED').insensitive();

export const stripeAccountValidation = Joi.string().pattern(/^(acct_)([a-zA-Z0-9]){16}$/).message('Should be valid stripe account').required();
