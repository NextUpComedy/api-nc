import { Response, NextFunction } from 'express';
import { errorMessages } from '../../helpers';
import { IUserRequest } from '../../interfaces';
import { getComedianList } from '../../services'; // Assuming there's a service function to get comedians

export default async (request: IUserRequest, response: Response, next: NextFunction)
:Promise<void> => {
  try {
    if (request.user) {
      const { id } = request.user;
      const comedianList = await getComedianList(Number(id));
      response.status(200).json({ comedians: comedianList });
    } else {
      throw errorMessages.NOT_EXIST_USER_ERROR;
    }
  } catch (error) {
    next(error);
  }
};
