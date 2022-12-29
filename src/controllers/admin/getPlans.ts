import { Request, Response, NextFunction } from 'express';
import { getPlans } from '../../services';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const plans = await getPlans();
    response.json({ data: plans });
  } catch (error) {
    next(error);
  }
};
