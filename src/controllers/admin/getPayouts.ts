import { Request, Response, NextFunction } from 'express';
import { getPayouts } from '../../services';
import { constants, dto } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus } = constants;

  const {
    page, limit, payoutStatusId, sort, userId,
  } = dto.adminDTO.getPayoutsAdminDTO(request);

  try {
    const userPayoutRequests = await getPayouts({
      page, limit, payoutStatusId, sort, userId,
    });
    response
      .status(httpStatus.OK).json({ data: userPayoutRequests });
  } catch (error) {
    next(error);
  }
};
