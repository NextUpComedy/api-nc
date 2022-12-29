import Joi from 'joi';
import {
  date, positiveNumber, email, limit, stringValidation, percentageNumber, uri,
} from '../validationRules';

export default Joi.object({
  nextupToOwedSplitPercentage: percentageNumber,
  systemActivationDate: date.required(),
  fetchMaxCount: positiveNumber,
  expiredAfterInYears: positiveNumber,
  viewliftEmail: email,
  viewliftEndpoint: uri,
  viewliftWatchesFetchLimit: limit.required(),
  viewliftPassword: stringValidation.required(),
  stripeKey: stringValidation.required(),
  calculatorEndpoint: uri,
});
