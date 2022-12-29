import { NextFunction, Response } from 'express';
import {
  constants, errorMessages, upload, dto,
} from '../../helpers';
import { getUserById } from '../../services';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const { httpStatus, userRoles, messages } = constants;
  const {
    id, image, name, user,
  } = dto.usersDTO.editProfileDTO(request);

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) throw errorMessages.NOT_EXIST_ERROR;

    if (image) {
      const { Location } = await upload(image, id);
      currentUser.image = Location;
    }

    if (name) { currentUser.name = name; }

    currentUser.updatedBy = user.id || userRoles.SYSTEM;
    await currentUser.save();

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.SUCCESS_EDIT });
  } catch (error) {
    next(error);
  }
};
