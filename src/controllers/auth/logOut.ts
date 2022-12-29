import { Request, Response } from 'express';
import { messages, httpStatus } from '../../helpers/constants';

export default async (_request: Request, response: Response):
Promise<void> => {
  const { authResponse, token } = messages;
  const { OK } = httpStatus;

  response.status(OK).clearCookie(token.ACCESS_TOKEN).json({ message: authResponse.LOGOUT });
};
