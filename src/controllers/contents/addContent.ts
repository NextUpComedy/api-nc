import { Response, NextFunction } from 'express';
import { Content, Report } from 'nc-db-new';
import { constants } from '../../helpers';
import { IAddContent, IUserRequest } from '../../interfaces';
import { addContent, addContentReport } from '../../services';

const addContentController = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const contentTitle: IAddContent = req.body;
  const contentId = 2000000 + Math.floor(Math.random() * 1000000);
  const { messages } = constants;

  try {
    const existingContent = await Content.findOne({
      where: { id: contentId },
      attributes: ['id'],
    });

    if (existingContent) {
      res.status(400).json({ error: 'Content with the provided ID already exists.' });
      return;
    }
  } catch (error) {
    console.error('Error checking existing content:', error);
    next(error);
    return;
  }
  const theLatestReport = await Report.findOne({
    order: [['id', 'DESC']],
    attributes: ['id'],
  });
  const contentData = {
    ...contentTitle,
    id: contentId,
    runtime: 1,
    createdBy: req.user?.id || 3,
    updatedBy: req.user?.id || 3,
    recoveredCosts: '0',
    publishDate: Date.now(),
    permalink: 'https://pbs.twimg.com/profile_images/1520037699197014023/j_t2nBpV_400x400.jpg',
    nextUpAccRevenue: '0',
    owedAccRevenue: '0',
  };
  try {
    const content = await addContent(contentData);
    const contentReportDefault = {
      contentId,
      watchedSeconds: 0,
      revenue: '0',
      owedRevenue: '0',
      reportId: theLatestReport?.id || 3,
      createdBy: contentData.createdBy,
      updatedBy: contentData.updatedBy,
      paid: false,
      prevWatchedSeconds: 0,
    };

    const contentReport = await addContentReport(contentReportDefault);

    res.status(201).json({
      message: messages.responses.CONTENT_ADD_SUCCESS,
      data: { content, contentReport },
    });
  } catch (error) {
    next(error);
  }
};

export default addContentController;
