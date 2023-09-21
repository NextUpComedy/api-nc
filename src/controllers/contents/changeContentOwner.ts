import { Request, Response, NextFunction } from 'express';
import { IChangeContentOwner } from '../../interfaces/DtoContents';

import { changeContentOwner } from '../../services';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { id, oldUserId, newUserId } = request.body as IChangeContentOwner;

  try {
    await changeContentOwner({ id, oldUserId, newUserId });

    response.json({ message: 'Content owner changed successfully' });
  } catch (error) {
    next(error);
  }
};
