import { ContentReport, Content } from 'nc-db-new';
import { Op } from 'sequelize';

const getContentReportByLinkedAgent = async (
  contentId: number,
  userId: number,
): Promise<any> => {
  const result = await ContentReport.findAndCountAll({
    where: {
      linkedUserIds: {
        [Op.contains]: [userId], // Check if userId is in the linkeduserids array
      },
      contentId,
    },
    attributes: ['id', 'watchedSeconds', 'reportId', 'paid'],
    include: [
      {
        model: Content,
        as: 'content',
        attributes: ['title', 'runtime', 'publishDate', 'userId'],
      },
    ],

  });

  return result;
};

export default getContentReportByLinkedAgent;
