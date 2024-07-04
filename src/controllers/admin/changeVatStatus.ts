import { Request, Response, NextFunction } from 'express';
import { changeVatStatus } from '../../services';
import { constants } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id, vat } = request.body;
  const { httpStatus, messages } = constants;

  try {
    const content = await changeVatStatus({
      id,
      vat,
    });

    response.status(httpStatus.OK)
      .json({
        message: messages.authResponse.CONTENT_CHANGED,
        data: {
          content,
        },
      });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
