import { Response, NextFunction } from 'express';
import { IUserRequest } from '../../interfaces';
import { getPayouts } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: IUserRequest, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus } = constants;

  const data = dto.usersDTO.getPayoutsByUserIdDTO(request);
  try {
    const userPayoutRequests = await getPayouts(data);
    response
      .status(httpStatus.OK).json({ data: userPayoutRequests });
  } catch (error) {
    next(error);
  }
};
