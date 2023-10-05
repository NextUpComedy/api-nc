import { Request, Response, NextFunction } from 'express';
import { getNews } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  try {
    const news = await getNews();

    response.status(200).json(news);
  } catch (error) {
    console.log(error);

    next(error);
  }
};
