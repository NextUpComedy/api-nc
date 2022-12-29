import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import {
  constants, checkExistence, errorMessages,
  verifyToken, tokenError, dto,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (request: Request, response: Response, next: NextFunction):Promise<void> => {
  const { password, resetPasswordToken } = dto.authDTO.resetPasswordDTO(request);
  const {
    messages, httpStatus, SALT_ROUNDS, redirectURLs,
  } = constants;

  try {
    if (!resetPasswordToken) {
      throw errorMessages.UNAUTHORIZED_ERROR;
    }

    const { email } = await verifyToken(resetPasswordToken);

    const user = await getUserByEmail(email);

    const userData = await checkExistence.ApprovalChecks(user);

    const hashedPassword = await hash(password, SALT_ROUNDS);
    userData.password = hashedPassword;
    await userData.save();

    response
      .status(httpStatus.OK)
      .clearCookie(messages.token.RESET_TOKEN)
      .json({
        message: { message: messages.authResponse.SUCCESS_RESET_PASSWORD },
        redirect: redirectURLs.LOGIN,
      });
  } catch (error) {
    next(tokenError(error as Error));
  }
};
