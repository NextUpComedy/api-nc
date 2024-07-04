import CustomError from './CustomError';
import { messages, httpStatus } from './constants';

export const NOT_EXIST_ERROR = new CustomError(
  messages.authResponse.NOT_EXIST,
  httpStatus.NOT_FOUND,
);

export const WRONG_EMAIL_OR_PASSWORD_ERROR = new CustomError(
  messages.authResponse.WRONG_EMAIL_OR_PASSWORD,
  httpStatus.UNAUTHORIZED,
);

export const UNAUTHORIZED_ERROR = new CustomError(
  messages.authResponse.UNAUTHORIZED,
  httpStatus.UNAUTHORIZED,
);

export const INCORRECT_PASSWORD_ERROR = new CustomError(
  messages.authResponse.INCORRECT_PASSWORD,
  httpStatus.BAD_REQUEST,
);

export const ALREADY_REJECTED_ERROR = new CustomError(
  messages.authResponse.ALREADY_REJECTED,
  httpStatus.UNAUTHORIZED,
);

export const PENDING_ERROR = new CustomError(
  messages.authResponse.PENDING,
  httpStatus.UNAUTHORIZED,
);

export const BANNED_ERROR = new CustomError(
  messages.authResponse.BANNED,
  httpStatus.UNAUTHORIZED,
);

export const ALREADY_EXIST_ERROR = new CustomError(
  messages.authResponse.ALREADY_EXIST,
  httpStatus.UNAUTHORIZED,
);

export const NO_CONTENT_ERROR = new CustomError(
  messages.authResponse.NO_CONTENT,
  httpStatus.NOT_FOUND,
);

export const RECOVERED_GREATER_COST_ERROR = new CustomError(
  messages.authResponse.RECOVERED_GREATER_COST,
  httpStatus.BAD_REQUEST,
);

export const CONTENT_MATCH_ERROR = new CustomError(
  messages.authResponse.ALREADY_MATCHED,
  httpStatus.BAD_REQUEST,
);

export const NOT_EXIST_USER_ERROR = new CustomError(
  messages.authResponse.NOT_EXIST_USER,
  httpStatus.BAD_REQUEST,
);

export const BAD_REQUEST_ERROR = new CustomError(
  messages.authResponse.BAD_REQUEST,
  httpStatus.BAD_REQUEST,
);

export const NO_USER_STRIPE_ACCOUNT = new CustomError(
  messages.responses.NO_STRIPE_ACCOUNT,
  httpStatus.BAD_REQUEST,
);

export const NO_BALANCE = new CustomError(
  messages.responses.NO_BALANCE,
  httpStatus.BAD_REQUEST,
);

export const INVALID_DATE_PROCESS = new CustomError(
  messages.responses.WRONG_DATE,
  httpStatus.BAD_REQUEST,
);

export const STRIPE_ERROR = (message:string):CustomError => new CustomError(
  message,
  httpStatus.BAD_REQUEST,
);

export const ADD_STRIPE_ACCOUNT_ERROR = new CustomError(
  messages.responses.ADD_STRIPE_ACCOUNT_ERROR,
  httpStatus.BAD_REQUEST,
);

export const INVALID_REPORT_DURATION = new CustomError(
  messages.responses.WRONG_REPORT_DURATION,
  httpStatus.BAD_REQUEST,
);

export const USER_HAS_OTHER_REVENUE = new CustomError(
  messages.responses.USER_HAS_OTHER_REVENUE,
  httpStatus.BAD_REQUEST,
);

export const CONTENT_NOT_MATCHED_ERROR = new CustomError(
  messages.authResponse.CONTENT_NOT_MATCHED_ERROR,
  httpStatus.BAD_REQUEST,
);

export const ACCOUNTANT_LINKED_AGENT_NOT_FOUND = new CustomError(
  messages.responses.ACCOUNTANT_LINKED_AGENT_NOT_FOUND,
  httpStatus.BAD_REQUEST,
);

export const PENDING_PAYOUT_REQUEST = new CustomError(
  messages.responses.PENDING_PAYOUT_REQUEST,
  httpStatus.BAD_REQUEST,
);

export const NO_AGENT_BALANCE = new CustomError(
  messages.responses.NO_AGENT_BALANCE,
  httpStatus.BAD_REQUEST,
);

export const NO_AGENT = new CustomError(
  messages.responses.NO_AGENT,
  httpStatus.BAD_REQUEST,
);

export const VAT_CONTENT_NOT_MATCHED = new CustomError(
  messages.responses.VAT_CONTENT_NOT_MATCHED,
  httpStatus.BAD_REQUEST,
);
