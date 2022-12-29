import { Request, Response, NextFunction } from 'express';
import { statisticsDTO } from '../../helpers/dto/admin';
import { IStatistics, IReports } from '../../interfaces';
import { getAdminStatistics, getPaginatedReports } from '../../services';

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const {
    fromDate,
    toDate,
    page,
    limit,
  } = statisticsDTO(request);

  try {
    let statistics: IStatistics;
    let reports: IReports;

    if (fromDate && toDate) {
      [statistics, reports] = await Promise.all([
        getAdminStatistics({ fromDate, toDate }),
        getPaginatedReports({ page, limit }),
      ]);

      response.json({ data: { statistics, reports } });
      return;
    }

    reports = await getPaginatedReports({ page, limit });

    response.json({ data: { reports } });
  } catch (error) {
    next(error);
  }
};
