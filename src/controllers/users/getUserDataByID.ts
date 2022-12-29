import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../../services';
import { constants, errorMessages, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus } = constants;
  const { userId } = dto.generalDTO.userIdDTO(request);
  try {
    const user = await getUserById(userId);
    if (!user) throw errorMessages.NOT_EXIST_ERROR;

    response.status(httpStatus.OK).json({ data: user });
  } catch (error) {
    next(error);
  }
};
