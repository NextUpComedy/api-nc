import Joi from 'joi';
import {
  date, positiveNumber, limit, stringValidation, percentageNumber, uri,
} from '../validationRules';

export default Joi.object({
  nextupToOwedSplitPercentage: percentageNumber,
  systemActivationDate: date.required(),
  fetchMaxCount: positiveNumber,
  expiredAfterInYears: positiveNumber,
  uScreenEndpoint: uri,
  uscreenApiKey: stringValidation.required(),
  uScreenWatchesFetchLimit: limit.required(),
  stripeKey: stringValidation.required(),
  calculatorEndpoint: uri,
});
