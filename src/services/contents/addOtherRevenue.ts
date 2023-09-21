import {
  ContentReport, User, Content,
} from 'nc-db-new';
import { errorMessages } from '../../helpers';

const addOtherRevenue = async (
  otherRevenue: JSON,
  contentId: number,
): Promise<unknown> => {
  try {
    const contentReport = await ContentReport.findOne({
      where: { contentId },
      attributes: ['id', 'watchedSeconds', 'revenue', 'owedRevenue', 'reportId', 'otherRevenue'],
      order: [['reportId', 'DESC']],
      limit: 1,
    });
    const content = await Content.findOne({
      where: { id: contentId },
      attributes: ['userId'],
    });

    const userId = content?.userId;
    let user;
    if (userId) {
      user = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'name', 'totalRevenue'],
      });
    }
    if (!contentReport) {
      throw new Error('Content report not found');
    }
    contentReport.otherRevenue = otherRevenue;
    await contentReport.save();
    let servicesRevenue = 0;
    if (otherRevenue !== null && otherRevenue !== undefined) {
      const otherRevenueString = JSON.stringify(otherRevenue);
      const otherRevenueObj = JSON.parse(otherRevenueString);

      if (Array.isArray(otherRevenueObj)) {
        otherRevenueObj.forEach((item) => {
          servicesRevenue += Number(item.revenue);
        });
        if (user?.totalRevenue) {
          let totalRevenue = Number(user.totalRevenue);
          totalRevenue += Number(servicesRevenue);
          user.totalRevenue = totalRevenue;
        }
        await user?.save();
      } else {
        throw new Error('Other revenue is not an array');
      }
    }

    return contentReport;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't add other revenue");
  }
};

export default addOtherRevenue;
