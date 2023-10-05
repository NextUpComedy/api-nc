import { Request, Response, NextFunction } from 'express';
import { getUserById, uploadContentByComedian } from '../../services';
import { constants, dto } from '../../helpers';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const {
    userId,
    text,
    link,
    type,
  } = dto.usersDTO.UploadContentDTO(request);
  const user = await getUserById(userId);

  const { httpStatus } = constants;
  try {
    await uploadContentByComedian({
      userId: Number(userId),
      link,
      text,
      type,
      createdBy: Number(user?.id),
      updatedBy: Number(user?.id),
    });
    response.status(httpStatus.OK).json({ message: 'Content Shared successfully' });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
