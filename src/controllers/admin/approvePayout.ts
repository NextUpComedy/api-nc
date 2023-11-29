import Big from 'big.js';
import { sequelize, ContentReport, Content } from 'nc-db-new';
import { NextFunction, Response } from 'express';
import {
  getPayoutRequestById,
  sendInvoice,
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
      preferredPayoutMethod,
      user,
      userId,
    } = dto.generalDTO.payoutDTO(payoutRequest);

    if (!preferredPayoutMethod) throw errorMessages.NO_USER_STRIPE_ACCOUNT;
    const contentItems = await Content.findAll({
      where: {
        userId,
      },
    });

    const contentReports = await ContentReport.findAll({
      where: {
        contentId: contentItems.map((item) => item.id),
        paid: false,
      },
    });

    sendInvoice(userId, payoutId, contentItems, contentReports);

    const updatePromises = contentReports.map((item) => item.update({
      paid: true,
    }));

    await Promise.all(updatePromises);

    await updatePayoutStatus({
      payoutRequest, payoutStatusId: payoutStatuesIds.APPROVED, transaction, updatedBy,
    });

    const paidRevenue = (new Big(user.paidRevenue)).plus(amount);

    await updateUserPaidRevenue({ paidRevenue, userId, transaction });
    await transaction.commit();
    response
      .status(httpStatus.OK)
      .json({ message: messages.responses.SUCCESS_PAYOUT_APPROVAL });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
