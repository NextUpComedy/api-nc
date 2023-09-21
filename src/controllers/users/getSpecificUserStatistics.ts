import { Request, Response, NextFunction } from 'express';
import { getNumberOfContent, getUserById } from '../../services';
import {
  constants,
  dto,
  errorMessages,
} from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { httpStatus } = constants;
  const { userId } = dto.generalDTO.userIdDTO(request);

  try {
    const user = await getUserById(userId);
    if (!user) throw errorMessages.NOT_EXIST_ERROR;

    const { totalRevenue, paidRevenue } = user;
    const balance = +totalRevenue - +paidRevenue;
    const content = await getNumberOfContent(
      { page: 1, limit: 40, userId: Number(user.id) },
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
