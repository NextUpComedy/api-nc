import { Request, Response, NextFunction } from 'express';

import { getUserById } from '../../services';
import { errorMessages, constants } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { userId } = request.params;
  const { userStatus, messages } = constants;

  try {
    const user = await getUserById(+userId);

    if (!user) throw errorMessages.NOT_EXIST_ERROR;

    user.userStatusId = userStatus.BANNED;
    await user.save();

    response.json({ message: messages.authResponse.BANNED });
  } catch (error) {
    next(error);
  }
};
