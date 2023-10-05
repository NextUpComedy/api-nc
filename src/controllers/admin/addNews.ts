import { Request, Response, NextFunction } from 'express';
import { addNews, getUserById } from '../../services';
import { constants, dto } from '../../helpers';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const {
    userId,
    title,
    newsContent,
    image,
    link,
  } = dto.adminDTO.addNewsDTO(request);
  const user = await getUserById(userId);

  const { httpStatus } = constants;
  try {
    await addNews({
      userId: Number(userId),
      userName: user?.name.toString() || '',
      title,
      newsContent,
      image,
      publishDate: new Date().toISOString(),
      link,
      createdBy: Number(user?.id),
      updatedBy: Number(user?.id),
    });
    response.status(httpStatus.OK).json({ message: 'News added successfully' });
  } catch (error) {
    console.log(error);

    next(error);
  }
};
