import { Request, Response, NextFunction } from 'express';
import { ContentReport, Content } from 'nc-db-new';
import { errorMessages } from '../../helpers';
import { addOtherRevenue } from '../../services';

export default async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { otherRevenue, contentId } = request.body as {
    otherRevenue: JSON;
    contentId: number;
    };

  try {
    if (!contentId) {
      throw new Error('Content id is required');
    }
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

    if (content?.userId == null) {
      throw errorMessages.CONTENT_NOT_MATCHED_ERROR;
    }
    console.log(contentReport?.otherRevenue);

    if (contentReport?.otherRevenue && Object.keys(contentReport.otherRevenue).length !== 0) {
      throw errorMessages.USER_HAS_OTHER_REVENUE;
    }
    await addOtherRevenue(otherRevenue, contentId);

    response.json({ message: 'Other revenue added successfully' });
  } catch (error) {
    next(error);
  }
};
