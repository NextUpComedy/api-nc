import { NextFunction, Request, Response } from 'express';
import { getUserById } from '../../services';
import {
  constants, sendEmail, dto, errorMessages,
} from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = dto.generalDTO.userIdDTO(request);
  const {
    messages,
    httpStatus,
    userRoles,
    userStatus,
    emailType,
    redirectURLs,
  } = constants;

  try {
    const user = await getUserById(userId);
    if (!user) { throw errorMessages.NOT_EXIST_ERROR; }

    user.userStatusId = userStatus.APPROVED;
    user.updatedBy = userRoles.SYSTEM;
    await user.save();

    const { name, email } = user;

    await sendEmail({
      email,
      type: emailType.APPROVE,
      name,
      redirectURL: redirectURLs.LOGIN,
    });

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.APPROVED_USER });
  } catch (error) {
    next(error);
  }
};
