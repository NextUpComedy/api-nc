import { Response, NextFunction } from 'express';
import { constants, dto, errorMessages } from '../../helpers';
import { getUserById } from '../../services';
import { IUserRequest } from '../../interfaces';

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  const { httpStatus, messages } = constants;
  try {
    const { userId, stripeAccount, updatedBy } = dto.adminDTO.setStripeAccountDTO(request);

    const user = await getUserById(userId);

    if (!user) { throw errorMessages.NOT_EXIST_ERROR; }

    const { message, status } = user.stripeAccount ? {
      message: messages.stripe.SUCCESS_UPDATE,
      status: httpStatus.OK,
    } : {
      message: messages.stripe.SUCCESS_ADD,
      status: httpStatus.CREATED,
    };

    user.stripeAccount = stripeAccount;

    user.updatedBy = updatedBy;

    await user.save();

    response
      .status(status)
      .json({ message, data: user });
  } catch (error) {
    next(error);
  }
};
