import { Request, Response, NextFunction } from 'express';
import { getContentReportByContentID } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const { contentId } = request.params;
  try {
    const reports = await getContentReportByContentID(parseFloat(contentId));
    response.status(200).json(reports);
  } catch (error) {
    console.log(error);

    next(error);
  }
};
