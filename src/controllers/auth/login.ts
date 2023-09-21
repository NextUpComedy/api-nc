import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import {
  constants,
  checkExistence,
  signToken,
  dto,
  errorMessages,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, password, rememberMe } = dto.authDTO.loginDTO(request);
  const { messages, httpStatus, expire } = constants;

  try {
    let expiresIn;
    if (rememberMe) { expiresIn = expire.EXP_30d; } else { expiresIn = expire.EXP_24h; }

    const userData = await getUserByEmail(email);

    const user = await checkExistence.ApprovalChecks(userData);

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw errorMessages.WRONG_EMAIL_OR_PASSWORD_ERROR;
    }

    const {
      id, name, userRoleId, image, preferredPayoutMethod,
    } = user;
    const token = await signToken(
      {
        id: Number(id),
        name,
        email,
        roleId: userRoleId,
        preferredPayoutMethod,
      },
      { expiresIn },
    );

    response
      .status(httpStatus.OK)
      .cookie(messages.token.ACCESS_TOKEN, token, { httpOnly: true, sameSite: 'none', secure: true })
      .json({
        message: messages.authResponse.SUCCESS_LOGIN,
        payload: {
          name,
          image,
          email,
          roleId: userRoleId,
          id: Number(id),
          preferredPayoutMethod,
        },
      });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
