/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import sgMail from '@sendgrid/mail';
import { User, Payout } from 'nc-db-new';
import Big from 'big.js';
import { askForPayout } from '../../services';
import { constants, dto, errorMessages } from '../../helpers';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { httpStatus, messages } = constants;

  const {
    createdBy, payoutStatusId, updatedBy, linkedAgentId,
  } = dto.usersDTO.askForAccountantPayoutDTO(request);

  try {
    if (!linkedAgentId) {
      throw errorMessages.ACCOUNTANT_LINKED_AGENT_NOT_FOUND;
    }

    const existingPayout = await Payout.findOne({
      where: {
        userId: linkedAgentId,
        payoutStatusId: 1, // Checking for payoutStatusId = 1
      },
    });
    if (existingPayout !== null) {
      throw errorMessages.PENDING_PAYOUT_REQUEST;
    }

    // Fetch the amount from the User model using Sequelize
    const agent = await User.findOne({ where: { id: linkedAgentId }, attributes: ['totalRevenue', 'paidRevenue'] });
    if (!agent) {
      throw errorMessages.NO_AGENT;
    }

    const amount = new Big(agent.totalRevenue).minus(agent.paidRevenue);
    if (amount.lt(1)) throw errorMessages.NO_BALANCE;

    // Create a payout request as if it's from the agent
    const userPayoutRequests = await askForPayout({
      amount, createdBy, payoutStatusId, updatedBy, userId: linkedAgentId,
    });

    // Send email notification
    const msg = {
      to: process.env.PAYOUT_EMAIL as string,
      from: process.env.SENDGRID_ADMIN_EMAIL as string,
      subject: 'New payout request',
      templateId: process.env.SENDGRID_NEW_PAYOUT_TEMPLATE_ID as string,
    };
    await sgMail.send(msg);

    // Response
    response.status(httpStatus.OK).json({ message: messages.authResponse.SUCCESS_PAYOUT, data: userPayoutRequests });
  } catch (error) {
    next(error);
  }
};
