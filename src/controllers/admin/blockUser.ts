import { NextFunction, Response, Request } from 'express';
import {
  checkExistence, constants, dto,
} from '../../helpers';
import { getUserById } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const { userId } = dto.generalDTO.userIdDTO(request);
  const { userStatus, httpStatus, messages } = constants;

  try {
    const userData = await getUserById(userId);
    const user = await checkExistence.ApprovalChecks(userData);

    user.userStatusId = userStatus.BANNED;
    user.updatedBy = user.id;
    await user.save();

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.BANNED_USER_SUCCESS });
  } catch (error) {
    next(error);
  }
};
