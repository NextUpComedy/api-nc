import { Op } from 'sequelize';
import { Content } from 'nc-db-new';
import { IGetPaginatedContentsDTO } from '../../helpers/dto/services';

const getMatchedContent: IGetPaginatedContentsDTO = ({ title, id }) => Content.findAll({
  where: { userId: { [Op.not]: null } },
  ...(title && { where: { title: { [Op.iLike]: `%${title}%` } } }),
  ...(id && { where: { id } }),
});

export default getMatchedContent;
