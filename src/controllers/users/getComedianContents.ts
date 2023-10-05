import { Response, NextFunction } from 'express';
import { userContentsDTO } from '../../helpers/dto/admin';
import { IUserRequest } from '../../interfaces';
import { getPaginatedComedianContents } from '../../services';
import {
  constants, dto,
} from '../../helpers';

export default async (
  request: IUserRequest,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { httpStatus } = constants;
  const { userId, page, limit } = userContentsDTO(request);

  try {
    const userContents = await getPaginatedComedianContents({ userId, page, limit });

    response.status(httpStatus.OK).json({
      data: {
        userContents,
      },
    });
  } catch (error) {
    next(error);
  }
};
