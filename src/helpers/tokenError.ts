import { CustomError } from '.';
import { httpStatus } from './constants';

export default (err: Error):Error => (err.toString().includes('JsonWebTokenError') || err.toString().includes('TokenExpiredError') ? new CustomError(err.message, httpStatus.BAD_REQUEST) : err);
