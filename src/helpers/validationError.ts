import { CustomError } from '.';

export default (err: Error):Error => (err.toString().includes('ValidationError') ? new CustomError(err.message, 400) : err);
