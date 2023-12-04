import { Response, NextFunction } from 'express';
import { User } from 'nc-db-new';
import { accounantContentsDTO } from '../../helpers/dto/users';
import { IUserRequest } from '../../interfaces';
import { getAccountantContents } from '../../services';
import {
  constants, errorMessages,
} from '../../helpers';

export default async (
  request: IUserRequest,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { httpStatus } = constants;
  const {
    page, limit, linkedAgentId,
  } = accounantContentsDTO(request);

  try {
    const userContents = await getAccountantContents({ linkedAgentId, page, limit });
    const agent = await User.findOne({ where: { id: linkedAgentId }, attributes: ['totalRevenue', 'paidRevenue'] });
    if (!agent) {
      throw errorMessages.NO_AGENT;
    }

    response.status(httpStatus.OK).json({
      data: {
        userContents,
        agent,
      },
    });
  } catch (error) {
    next(error);
  }
};
