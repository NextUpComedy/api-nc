import { Response, NextFunction } from 'express';
import { IUserRequest } from '../../interfaces';
import {
  constants, dto,
} from '../../helpers';
import { getNumberOfContent } from '../../services';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const { httpStatus } = constants;
  const { user } = dto.generalDTO.userDTO(request);
  try {
    const { totalRevenue, paidRevenue } = user;
    const balance = +totalRevenue - +paidRevenue;
    const content = await getNumberOfContent(
      { page: 1, limit: 10, userId: Number(user.id) },
    );

    response
      .status(httpStatus.OK)
      .json({
        data: {
          totalRevenue,
          paidRevenue,
          balance,
          content,
        },
      });
  } catch (error) {
    next(error);
  }
};
