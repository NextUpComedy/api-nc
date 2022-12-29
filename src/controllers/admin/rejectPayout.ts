import { NextFunction, Response } from 'express';
import {
  getPayoutRequestById,
  updatePayoutStatus,
} from '../../services';
import { constants, dto, errorMessages } from '../../helpers';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const { messages, httpStatus, payoutStatuesIds } = constants;
  const { REJECTED, PENDING } = payoutStatuesIds;
  const { BAD_REQUEST_ERROR } = errorMessages;
  const { user } = dto.generalDTO.userDTO(request);
  if (!user) throw errorMessages.NOT_EXIST_ERROR;
  const { userId: updatedBy } = dto.generalDTO.userIdFromUserDTO(user);
  const { payoutId } = dto.generalDTO.payoutIdDTO(request);
  const { rejectionReason } = dto.generalDTO.payoutRejectionReasonDTO(request);

  try {
    const payoutRequest = await getPayoutRequestById(payoutId);

    if (!payoutRequest || payoutRequest.payoutStatusId !== PENDING) throw BAD_REQUEST_ERROR;

    await updatePayoutStatus({
      payoutRequest, payoutStatusId: REJECTED, rejectionReason, updatedBy,
    });

    response
      .status(httpStatus.OK)
      .json({ message: messages.responses.SUCCESS_PAYOUT_REJECTION });
  } catch (error) {
    next(error);
  }
};
