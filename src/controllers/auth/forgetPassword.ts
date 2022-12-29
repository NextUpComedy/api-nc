import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import {
  constants, checkExistence, sendEmail, dto, signToken,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const {
    messages, httpStatus, emailType,
  } = constants;

  const { email } = dto.authDTO.forgetPasswordDTO(request);

  try {
    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    const { name, userRoleId, id } = user;
    const token = await signToken(
      {
        id: Number(id),
        name,
        email,
        roleId: userRoleId,
      },
      { expiresIn: '1h' },
    );

    const redirectURL = `${config.server.SERVER_URL}/api/v1/auth/reset-password/${token}`;

    await sendEmail({
      email,
      type: emailType.RESET,
      name: user.name,
      redirectURL,
    });

    response
      .status(httpStatus.OK)
      .json({ message: messages.check.RESET_EMAIL_CHECK });
  } catch (error) {
    next(error);
  }
};
