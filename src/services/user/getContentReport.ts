import { Content, ContentReport } from 'nc-db-new';
import { IGetContentReportDTO } from '../../helpers/dto/services';

const getNumberOfContent: IGetContentReportDTO = ({ page, limit, userId }) => {
  const offset = (page - 1) * limit;

  return Content.findAndCountAll({
    offset,
    limit,
    where: { userId },
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

    attributes: [
      'title',
      'runtime',
      'publishDate',
      'permalink',
      'advance',
      'launchDate',
      'nextUpAccRevenue',
      'owedAccRevenue',
      'feePaid',
      'filmingCosts',
      'recoveredCosts',
      'primaryCategory',
      'otherRevenue',
      'notes',
      'vat',
    ],

  });
};

export default getNumberOfContent;
