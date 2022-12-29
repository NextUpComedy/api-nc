import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { constants, verifyToken, tokenError } from '../../helpers';
import { getUserByEmail } from '../../services';

export default async (req: Request, res: Response, next: NextFunction)
:Promise<void> => {
  const { messages } = constants;
  const { NOT_EXIST } = messages.authResponse;
  const { REDIRECT } = constants.httpStatus;
  const { token } = req.params;

  try {
    const { email } = await verifyToken(token);

    const lowerCaseEmail = email.toLowerCase();

    const userExists = await getUserByEmail(lowerCaseEmail);
    if (!userExists) res.json({ message: NOT_EXIST });

    res
      .status(REDIRECT)
      .cookie(messages.token.RESET_TOKEN, token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .redirect(`${config.server.CLIENT_URL}/resetPassword`);
  } catch (error) {
    next(tokenError(error as Error));
  }
};
