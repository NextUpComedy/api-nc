import { Request, Response, NextFunction } from 'express';
import { getUsers } from '../../services';

export default async ({ query }: Request, response: Response, next: NextFunction)
: Promise<void> => {
  // ToDo: Create DTO Here
  const { page, limit } = query;

  try {
    const data = await getUsers({ page: Number(page), limit: Number(limit) });

    response.json({ data });
  } catch (err) {
    next(err);
  }
};
