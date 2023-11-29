import { Request, NextFunction, Response } from 'express';
import {
  constants, upload,
} from '../../helpers';
import { editNews } from '../../services';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const {
    id, title, newsContent, link, image, userId,
  } = request.body;
  const { httpStatus, messages } = constants;

  try {
    const news = await editNews({
      id, title, newsContent, link, image, userId,
    });

    if (image) {
      const { Location } = await upload(image, id);
      news.image = Location;
    }
    response.status(200).status(httpStatus.OK)
      .json({
        message: messages.authResponse.CONTENT_CHANGED,

        data: {
          news,
        },
      });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
