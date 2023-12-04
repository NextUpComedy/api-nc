import { Response, NextFunction } from 'express';
import { IUserRequest, IUser } from '../../interfaces';
import { getAccountantPayouts } from '../../services';
import { constants, dto } from '../../helpers';

export default async (
  request: IUserRequest,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { httpStatus } = constants;

  try {
    const { linkedAgentId } = request.user as IUser;

    if (!linkedAgentId) {
      throw new Error('Accountant must have a linked agent.');
    }

    const data = dto.usersDTO.getPayoutsByUserIdDTO(request);
    data.userId = linkedAgentId;
    const agentPayoutRequests = await getAccountantPayouts(data);

    response
      .status(httpStatus.OK)
      .json({ data: agentPayoutRequests });
  } catch (error) {
    next(error);
  }
};
