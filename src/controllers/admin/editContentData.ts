import { Request, Response, NextFunction } from 'express';
import { editContentData } from '../../services';
import { constants } from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    userId, id, launchDate, filmingCosts, feePaid, advance, recoveredCosts,
  } = request.body;
  const { httpStatus, messages } = constants;

  try {
    const content = await editContentData({
      userId, id, launchDate, filmingCosts, feePaid, advance, recoveredCosts,
    });

    response.status(200).status(httpStatus.OK)
      .json({
        message: messages.authResponse.CONTENT_CHANGED,

        data: {
          content,
        },
      });
  } catch (error) {
    next(error);
  }
};
