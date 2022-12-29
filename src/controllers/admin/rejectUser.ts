import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../../services';
import {
  constants, sendEmail, dto, errorMessages,
} from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { userId, rejectionReason } = dto.generalDTO.userIdDTO(request);
  const {
    userRoles, userStatus, emailType, redirectURLs,
  } = constants;

  try {
    const user = await getUserById(userId);
    if (!user) throw errorMessages.NOT_EXIST_ERROR;

    user.rejectionReason = rejectionReason;
    user.userStatusId = userStatus.REJECTED;
    user.updatedBy = userRoles.SYSTEM;
    await user.save();

    const { name, email } = user;

    await sendEmail({
      email,
      type: emailType.REJECT,
      name,
      redirectURL: redirectURLs.FAQ,
      contactUs: redirectURLs.CONTACT_US,
    });

    response
      .status(constants.httpStatus.OK)
      .json({ message: constants.messages.check.REJECT_EMAIL_CHECK });
  } catch (err) {
    next(err);
  }
};
