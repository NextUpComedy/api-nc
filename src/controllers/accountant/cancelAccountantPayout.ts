import { Response, NextFunction } from 'express';
import { getUserPendingPayoutRequest, updatePayoutRequestStatus } from '../../services';
import { constants } from '../../helpers';
import { IUser, IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus, messages } = constants;
  const { linkedAgentId } = request.user as IUser;

  if (!linkedAgentId) {
    throw new Error('Accountant must have a linked agent.');
  }

  try {
    const payoutRequest = await getUserPendingPayoutRequest({ userId: linkedAgentId });
    const payoutStatusId = constants.payoutStatuesIds.CANCELLED;

    if (payoutRequest) {
      await updatePayoutRequestStatus({ payoutRequest, payoutStatusId, updatedBy: linkedAgentId });
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
