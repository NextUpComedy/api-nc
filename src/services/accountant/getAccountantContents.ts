import { Content, ContentReport, IContent } from 'nc-db-new';

import { IGetAccountantContentsDTO } from '../../helpers/dto/services';

const getAccountantContents: IGetAccountantContentsDTO = async ({
  linkedAgentId,
  page,
  limit,
}) => {
  try {
    const offset = (page - 1) * limit;

    const accContents: { rows: IContent[]; count: number } = await Content.findAndCountAll({
      where: {
        userId: linkedAgentId,
      },
      attributes: ['id', 'title', 'runtime', 'launchDate', 'userId', 'owedAccRevenue'],
      offset,
      limit,
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
          ],
        },
      ],
    });

    return accContents;
  } catch (error) {
    console.log(error);

    throw new Error('Error fetching paginated user contents');
  }
};

export default getAccountantContents;
