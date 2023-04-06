import { Request, Response, NextFunction } from 'express';
import { dto } from '../../helpers';
import { getUnmatchedContent } from '../../services';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const paginationData = dto.generalDTO.paginationDTO(request);
  console.log(paginationData);

  try {
    const data = await getUnmatchedContent(paginationData);

    response
      .json({ data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
