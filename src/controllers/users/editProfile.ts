import { NextFunction, Response } from 'express';
import { compare, hash } from 'bcrypt';
import {
  constants, errorMessages, upload, dto,
} from '../../helpers';
import { getUserById } from '../../services';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const {
    httpStatus, userRoles, messages, SALT_ROUNDS,
  } = constants;

  const {
    id, image, name, user, password,
  } = dto.usersDTO.editProfileDTO(request);

  try {
    const currentUser = await getUserById(id);
    if (!currentUser) throw errorMessages.NOT_EXIST_ERROR;

    if (image) {
      const { Location } = await upload(image, id);
      currentUser.image = Location;
    }

    if (name) { currentUser.name = name; }

    if (password) {
      const hashedPassword = await hash(password, SALT_ROUNDS);

      currentUser.password = hashedPassword;
      await user.save();
    }

    currentUser.updatedBy = user.id || userRoles.SYSTEM;
    await currentUser.save();

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.SUCCESS_EDIT });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
