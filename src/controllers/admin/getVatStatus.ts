import { Request, Response, NextFunction } from 'express';
import getVatStatus from '../../services/admin/getVatStatus';
import { httpStatus, messages } from '../../helpers/constants';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { contentId } = request.params;

  if (Number.isNaN(Number(contentId))) {
    response.status(httpStatus.BAD_REQUEST).json({
      message: 'Invalid content ID',
    });
    return;
  }

  try {
    const vatStatus = await getVatStatus({ id: Number(contentId) });

    response.status(httpStatus.OK)
      .json({
        data: vatStatus,
        message: messages.responses.VAT_CHANGED_SUCCESS,
      });
  } catch (error) {
    next(error);
  }
};
