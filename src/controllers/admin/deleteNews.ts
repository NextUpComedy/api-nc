import { Request, Response, NextFunction } from 'express';
import { deleteNews } from '../../services';
import { constants } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { newsId } = request.params; // Assuming the ID is passed as a URL parameter

  const { httpStatus, messages } = constants;

  try {
    await deleteNews(newsId);

    response.status(httpStatus.OK).json({
      message: messages.authResponse.NEWS_DELETED,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
