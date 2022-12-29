import { Request, Response, NextFunction } from 'express';
import { constants, dto } from '../../helpers';
import { getUsersStatus } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { userStatus, httpStatus } = constants;
  const { page, limit } = dto.generalDTO.paginationDTO(request);

  try {
    const data = await getUsersStatus(userStatus.REJECTED, {
      page, limit,
    });

    response
      .status(httpStatus.OK)
      .json({ data });
  } catch (error) {
    next(error);
  }
};
