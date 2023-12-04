import { Request, Response, NextFunction } from 'express';
import sgMail from '@sendgrid/mail';
import { askForPayout } from '../../services';
import { constants, dto, errorMessages } from '../../helpers';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async (request: Request, response: Response, next: NextFunction)
: Promise<void> => {
  const { httpStatus, messages } = constants;

  const msg = {
    to: process.env.PAYOUT_EMAIL as string,
    from: process.env.SENDGRID_ADMIN_EMAIL as string,
    subject: 'New payout request',
    templateId: process.env.SENDGRID_NEW_PAYOUT_TEMPLATE_ID as string,
  };
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

    await sgMail.send(msg);
  } catch (error) {
    next(error);
  }
};
