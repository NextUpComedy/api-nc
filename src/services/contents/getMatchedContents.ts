import { Op } from 'sequelize';
import { Content, ContentReport } from 'nc-db-new';
import { IGetPaginatedContentsDTO } from '../../helpers/dto/services';

const getMatchedContent: IGetPaginatedContentsDTO = ({ title, id }) => Content.findAll({
  where: { userId: { [Op.not]: null } },
  ...(title && { where: { title: { [Op.iLike]: `%${title}%` } } }),
  ...(id && { where: { id } }),
  include: [
    {
      model: ContentReport,
      as: 'contentReports',
      limit: 1,
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'watchedSeconds',
        'revenue',
        'owedRevenue',
        'otherRevenue',
        'paid',
      ],
    },
  ],
});

export default getMatchedContent;
