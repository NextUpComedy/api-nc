import { Op } from 'sequelize';
import { Content } from 'nc-db-new';
import { IGetPaginatedContentsDTO } from '../../helpers/dto/services';

const getUnmatchedContent: IGetPaginatedContentsDTO = ({
  page, limit, title, id,
}) => {
  if (!page && !limit) {
    return Content.findAll({
      where: { userId: { [Op.is]: null } },
    });
  }

  const offset = (page - 1) * limit;

  if (!title && !id) {
    return Content.findAndCountAll({
      offset,
      limit,
      where: { userId: { [Op.is]: null } },
    });
  }

  if (title && !id) {
    return Content.findAll({
      where: { title: { [Op.iLike]: `%${title}%` } },
    });
  }

  return Content.findOne({
    where: { id },
  });
};

export default getUnmatchedContent;
