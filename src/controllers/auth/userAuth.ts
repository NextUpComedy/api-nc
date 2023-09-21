import { Response, NextFunction } from 'express';
import { IUserRequest } from '../../interfaces';
import { constants, dto, errorMessages } from '../../helpers';

export default async (request: IUserRequest, response: Response, next: NextFunction):
Promise<void> => {
  const { messages, httpStatus } = constants;
  const { user } = dto.authDTO.userAuthDTO(request);

  try {
    if (!user) throw errorMessages.NOT_EXIST_ERROR;
    const {
      id,
      userRoleId,
      email,
      name,
      image,
      preferredPayoutMethod,
    } = user;

    response
      .status(httpStatus.OK)
      .json({
        message: messages.authResponse.APPROVED_USER,
        data: {
          id, roleId: userRoleId, email, name, image, preferredPayoutMethod,
        },
      });
  } catch (error) {
    next(error);
  }
};
