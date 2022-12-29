import { Request, Response, NextFunction } from 'express';
import { askForPayout } from '../../services';
import { constants, dto, errorMessages } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus, messages } = constants;
  const {
    amount, createdBy, payoutStatusId, updatedBy, userId,
  } = dto.usersDTO.askForPayoutDTO(request);
  try {
    if (amount.lt(1)) throw errorMessages.NO_BALANCE;
    const userPayoutRequests = await askForPayout({
      amount, createdBy, payoutStatusId, updatedBy, userId,
    });

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.SUCCESS_PAYOUT, data: userPayoutRequests });
  } catch (error) {
    next(error);
  }
};
