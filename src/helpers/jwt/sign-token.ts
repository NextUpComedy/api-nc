import { sign, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUserInfo } from '../../interfaces';

dotenv.config();

const { JWT_SECRET } = process.env;

export default (
  user: IUserInfo,
  options: object,
): Promise<string> => new Promise((resolve, reject) => {
  sign(user, JWT_SECRET as Secret, options, (err, token) => {
    if (err) return reject(err);
    return resolve(token as string);
  });
});
