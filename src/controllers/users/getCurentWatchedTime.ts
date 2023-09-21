import { Request, Response, NextFunction } from 'express';
import { getCurentWatchedTime } from '../../services';
import { constants } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus } = constants;

  const { contentId } = request.params;

  try {
    const data = await getCurentWatchedTime(Number(contentId));
    response
      .status(httpStatus.OK).json({ data });
  } catch (error) {
    next(error);
  }
};
