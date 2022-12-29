import { Response, NextFunction } from 'express';
import { getUserPendingPayoutRequest, updatePayoutRequestStatus } from '../../services';
import { constants, dto } from '../../helpers';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus, messages } = constants;
  const { userId } = dto.generalDTO.userDTO(request);

  try {
    const payoutRequest = await getUserPendingPayoutRequest({ userId });
    const payoutStatusId = constants.payoutStatuesIds.CANCELLED;

    if (payoutRequest) {
      await updatePayoutRequestStatus({ payoutRequest, payoutStatusId, updatedBy: userId });
      response
        .status(httpStatus.OK)
        .json({ message: messages.authResponse.SUCCESS_CANCEL_PAYOUT, data: payoutRequest });
    } else {
      response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: messages.authResponse.NO_REQUEST, data: payoutRequest });
    }
  } catch (error) {
    next(error);
  }
};
