import { Request, Response, NextFunction } from 'express';
import { addComedianContent } from '../../services';
import {
  constants, dto,
} from '../../helpers';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { contentIds, userId } = dto.contentDTO.addComedianContentDTO(request);

  try {
    await addComedianContent({
      contentIds,
      userId,
    });

    response
      .json({ message: constants.messages.authResponse.MATCH_SUCCESSFULLY });
  } catch (error) {
    next(error);
  }
};
