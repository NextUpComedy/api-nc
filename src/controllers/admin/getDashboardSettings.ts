import { Request, Response, NextFunction } from 'express';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const data = request.app.get('settings');
    response
      .json({ data });
  } catch (error) {
    next(error);
  }
};
