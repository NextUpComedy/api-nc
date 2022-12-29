import { Response, NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import { errorMessages, constants, dto } from '../../helpers';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const { oldPassword, password, user } = dto.usersDTO.resetPasswordDTO(request);
  const { httpStatus, messages, SALT_ROUNDS } = constants;

  try {
    const isMatch = await compare(oldPassword, user.password as string);

    if (!isMatch) {
      throw errorMessages.INCORRECT_PASSWORD_ERROR;
    }
    const hashedPassword = await hash(password, SALT_ROUNDS);

    user.password = hashedPassword;
    await user.save();

    response
      .status(httpStatus.OK)
      .json({ message: messages.authResponse.PASSWORD_CHANGED });
  } catch (error) {
    next(error);
  }
};
