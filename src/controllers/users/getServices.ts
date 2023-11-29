import { Request, Response, NextFunction } from 'express';
import { getServices } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  try {
    const services = await getServices();

    response.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
