import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcrypt';
import generatePassword from 'generate-password';
import {
  checkExistence,
  constants,
  sendEmail,
  googleAuthentication,
  dto,
} from '../../helpers';
import { addUser } from '../../services';

export default async (request: Request, response: Response, next: NextFunction)
:Promise<void> => {
  const {
    httpStatus,
    userRoles,
    REVENUE_DEFAULT_VALUE,
    PASSWORD_LENGTH,
    emailType,
  } = constants;
  const { tokenId } = dto.authDTO.GoogleDTO(request);
  try {
    const {
      email, name, image, googleId,
    } = await googleAuthentication(tokenId);

    await checkExistence.RegistrationCheck(email);

    const password = generatePassword.generate({
      length: PASSWORD_LENGTH,
      numbers: true,
      strict: true,
      lowercase: true,
      uppercase: true,
    });

    const hashedPassword = await hash(password, 10);

    const user = await addUser({
      name,
      email,
      userRoleId: userRoles.AGENT,
      password: hashedPassword,
      createdBy: userRoles.SYSTEM,
      updatedBy: userRoles.SYSTEM,
      image,
      googleId,
      userStatusId: constants.userStatus.PENDING,
      totalRevenue: REVENUE_DEFAULT_VALUE,
      paidRevenue: REVENUE_DEFAULT_VALUE,
    });

    await sendEmail({
      email: user.email,
      type: emailType.VERIFY,
      name: user.name,
    });

    response
      .status(httpStatus.CREATED)
      .json({ message: constants.messages.authResponse.SUCCESS_SIGNUP });
  } catch (error) {
    next(error);
  }
};
