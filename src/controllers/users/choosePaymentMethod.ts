import { Request, Response, NextFunction } from 'express';
import { httpStatus, messages } from '../../helpers/constants';
import { choosePaymentMethod } from '../../services/user';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const payload = request.body;
  try {
    await choosePaymentMethod({ payload });
    response.status(200).status(httpStatus.OK)
      .json({
        message: messages.authResponse.PAYMENT_METHOD_CHANGED,
      });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
