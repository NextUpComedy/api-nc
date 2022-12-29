import Big from 'big.js';
import { sequelize } from 'db-models-nc';
import { NextFunction, Response } from 'express';
import {
  createStripePayout,
  getPayoutRequestById,
  updatePayoutStatus,
  updateUserPaidRevenue,
} from '../../services';
import { constants, dto, errorMessages } from '../../helpers';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const { messages, httpStatus, payoutStatuesIds } = constants;

  const transaction = await sequelize.transaction();

  const { payoutId, updatedBy } = dto.generalDTO.payoutIdDTO(request);

  try {
    const payoutRequest = await getPayoutRequestById(payoutId);

    if (!payoutRequest
      || payoutRequest
        .payoutStatusId !== payoutStatuesIds.PENDING) throw errorMessages.BAD_REQUEST_ERROR;

    const {
      amount,
      stripeAccount,
      user,
      userId,
    } = dto.generalDTO.payoutDTO(payoutRequest);

    if (!stripeAccount) throw errorMessages.NO_USER_STRIPE_ACCOUNT;

    await updatePayoutStatus({
      payoutRequest, payoutStatusId: payoutStatuesIds.APPROVED, transaction, updatedBy,
    });

    const paidRevenue = (new Big(user.paidRevenue)).plus(amount);

    await updateUserPaidRevenue({ paidRevenue, userId, transaction });

    await createStripePayout({ stripeAccount, amountInPounds: amount }).catch((e) => {
      throw errorMessages.STRIPE_ERROR(e.raw.message);
    });

    await transaction.commit();
    response
      .status(httpStatus.OK)
      .json({ message: messages.responses.SUCCESS_PAYOUT_APPROVAL });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
