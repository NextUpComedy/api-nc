import { Response, NextFunction } from 'express';
import { IUserRequest } from '../../interfaces';
import { getContentReportByLinkedAgent } from '../../services';

export default async (request: IUserRequest, response: Response, next: NextFunction)
: Promise<void> => {
  const { contentId } = request.params;
  const id = request.user?.id;

  try {
    const reports = await getContentReportByLinkedAgent(parseFloat(contentId), Number(id));
    response.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};
