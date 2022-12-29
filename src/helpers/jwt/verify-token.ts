import {
  verify,
} from 'jsonwebtoken';
import { IUser } from '../../interfaces';
import config from '../../config';

export default (token: string): Promise<IUser> => new Promise((resolve, reject) => {
  verify(token, config.server.SECRET_KEY, {}, (err, match):void => {
    if (err) reject(err);
    resolve(match as IUser);
  });
});
