import { Request, Response, NextFunction } from 'express';
import {
  checkExistence, constants, validateError, signToken, googleAuthentication, dto, errorMessages,
} from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { tokenId } = dto.authDTO.GoogleDTO(request);
  const { messages, httpStatus } = constants;
  try {
    const {
      email, googleId,
    } = await googleAuthentication(tokenId);

    const userData = await getUserByEmail(email);
    const user = await checkExistence.ApprovalChecks(userData);

    if (user.googleId !== googleId) {
      throw errorMessages.UNAUTHORIZED_ERROR;
    }

    const { id, name, userRoleId } = user;

    const token = await signToken({
      id: Number(id), name, email, roleId: userRoleId,
    }, { expiresIn: '24h' });

    response
      .status(httpStatus.OK)
      .cookie(messages.token.ACCESS_TOKEN, token, { httpOnly: true, sameSite: 'none', secure: true })
      .json({
        message: messages.authResponse.SUCCESS_LOGIN,
        payload: {
          id: Number(id), name, email, roleId: userRoleId,
        },
      });
  } catch (error) {
    next(validateError(error as Error));
  }
};
