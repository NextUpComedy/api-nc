import { Request, Response, NextFunction } from 'express';
import { httpStatus, messages } from '../../helpers/constants';
import { changeUserContentVatStatus } from '../../services/user';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { userId, contentStatusArray } = request.body;

  // contentStatusArray is already an array, no need to parse it
  if (!Array.isArray(contentStatusArray)) {
    response.status(httpStatus.BAD_REQUEST).json({
      message: 'Invalid contentStatusArray format.',
    });
    return;
  }

  try {
    await changeUserContentVatStatus(userId, contentStatusArray);
    response.status(httpStatus.OK).json({
      message: messages.responses.VAT_CHANGED_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};
