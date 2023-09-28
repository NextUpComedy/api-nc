import { ContentReport, Content } from 'nc-db-new';

const getContentReportByContentID = async (
  contentId: number,
): Promise<any> => {
  const result = await ContentReport.findAndCountAll({
    where: { contentId },
    attributes: ['id', 'watchedSeconds', 'revenue', 'owedRevenue', 'reportId', 'otherRevenue', 'paid'],
    include: [
      {
        model: Content,
        as: 'content',
        attributes: ['title', 'runtime', 'publishDate', 'otherRevenue', 'userId'],
      },
    ],

  });

  return result;
};

export default getContentReportByContentID;
