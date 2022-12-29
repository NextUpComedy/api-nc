import { Response, NextFunction } from 'express';
import { userContentsDTO } from '../../helpers/dto/admin';
import { IUserRequest } from '../../interfaces';
import { getPaginatedUserContents } from '../../services';

export default async (
  request: IUserRequest,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { userId, page, limit } = userContentsDTO(request);

  try {
    const userContents = await getPaginatedUserContents({ userId, page, limit });

    response.json({ data: userContents });
  } catch (error) {
    next(error);
  }
};
