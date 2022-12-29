import { Report } from 'db-models-nc';

type IGetPaginatedReports = ({ page, limit }: { page: number, limit: number }) => Promise<any>;

const getPaginatedReports: IGetPaginatedReports = async ({ page, limit }) => {
  const offset = (page - 1) * limit;

  const reports = await Report.findAndCountAll({
    offset,
    limit,
    attributes: ['watchTimeFrom', 'watchTimeTo', 'overallWatchedSeconds', 'totalRevenue'],
    order: [['createdAt', 'DESC']],
  });

  return reports;
};

export default getPaginatedReports;
