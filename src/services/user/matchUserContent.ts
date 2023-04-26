import {
  Content, IContent, ContentReport, Report, User,
} from 'nc-db-new';
import {
  min, max, differenceInDays, addYears,
} from 'date-fns';
import Big from 'big.js';

import { errorMessages } from '../../helpers';

type IMatchUserContent = (userData: {
  id: string;
  userId: number;
  filmingCosts: string;
  launchDate: string;
  advance: string;
  feePaid: string;
  recoveredCosts: string;
  nextUpToOwedSplitPercentage: string;
  expiredAfterInYears: number;
  otherRevenue: JSON;
}) => Promise<IContent>;

const matchUserContent: IMatchUserContent = async ({
  id,
  userId,
  filmingCosts,
  launchDate,
  advance,
  feePaid,
  recoveredCosts,
  nextUpToOwedSplitPercentage,
  expiredAfterInYears,
  otherRevenue,
}) => {
  const [content, user] = await Promise.all([
    Content.findOne({
      where: { id },
      include: {
        model: ContentReport,
        as: 'contentReports',
        include: [
          { model: Report, attributes: ['watchTimeFrom', 'watchTimeTo'] },
        ],
      },
    }),
    User.findOne({ where: { id: userId } }),
  ]);

  if (!content) {
    throw errorMessages.NO_CONTENT_ERROR;
  }

  if (content.userId) throw errorMessages.CONTENT_MATCH_ERROR;

  if (!user) throw errorMessages.NOT_EXIST_USER_ERROR;

  content.userId = userId;
  content.filmingCosts = filmingCosts;
  content.launchDate = launchDate;
  content.advance = advance;
  content.feePaid = feePaid;
  content.recoveredCosts = recoveredCosts;
  content.otherRevenue = otherRevenue;
  let servicesRevenue = 0;
  if (otherRevenue !== null && otherRevenue !== undefined) {
    const otherRevenueString = JSON.stringify(otherRevenue);
    const otherRevenueObj = JSON.parse(otherRevenueString);
    otherRevenueObj.forEach((item:any) => {
      servicesRevenue += item.revenue;
    });
  }
  console.log('servicesRevenue', servicesRevenue);
  const cReports = content?.contentReports?.map(
    ({
      id,
      contentId,
      reportId,
      watchedSeconds,
      prevWatchedSeconds,
      revenue,
      createdBy,
      updatedBy,
      report,
    }) => {
      if (!report) throw errorMessages.BAD_REQUEST_ERROR;
      const nextupRevenue: Big = new Big(revenue).times(
        nextUpToOwedSplitPercentage,
      );
      const remaingRevenue: Big = new Big(revenue).minus(nextupRevenue).plus(servicesRevenue);

      const toDate = new Date(report.watchTimeTo);
      const fromDate: Date = new Date(report.watchTimeFrom);
      const expDate = addYears(new Date(launchDate), expiredAfterInYears);
      const markPointDate = max([min([expDate, toDate]), fromDate]);
      const beforeExpiryReportDaysPercentage = new Big(1)
        .times(differenceInDays(markPointDate, fromDate))
        .div(differenceInDays(toDate, fromDate));
      const beforeExpRevenue = beforeExpiryReportDaysPercentage.times(remaingRevenue);
      const afterExpRevenue: Big = new Big(remaingRevenue).minus(
        beforeExpRevenue,
      );
      let owedRevenue = afterExpRevenue;

      const remainingCosts = new Big(filmingCosts)
        .plus(feePaid)
        .plus(advance)
        .minus(recoveredCosts); // >=0
      let shareableBeforeExpRevenue = beforeExpRevenue;
      if (remainingCosts.gt(0)) {
        shareableBeforeExpRevenue = shareableBeforeExpRevenue.minus(remainingCosts);
        if (shareableBeforeExpRevenue.lt(0)) {
          shareableBeforeExpRevenue = new Big(0);
        }
      }
      const reimbursementBeforeExpRevenue = beforeExpRevenue.minus(
        shareableBeforeExpRevenue,
      );
      owedRevenue = owedRevenue.plus(shareableBeforeExpRevenue);

      content.nextUpAccRevenue = nextupRevenue
        .plus(content.nextUpAccRevenue)
        .toString();

      content.owedAccRevenue = owedRevenue
        .plus(content.owedAccRevenue)
        .toString();
      content.recoveredCosts = reimbursementBeforeExpRevenue
        .plus(recoveredCosts)
        .toString();
      user.totalRevenue = owedRevenue.plus(user.totalRevenue);

      return {
        id,
        contentId,
        reportId,
        watchedSeconds,
        prevWatchedSeconds,
        revenue,
        createdBy,
        updatedBy,
        nextupRevenue: nextupRevenue.toString(),
        owedRevenue: owedRevenue.toString(),
        beforeExpiryReportDaysPercentage:
          beforeExpiryReportDaysPercentage.toString(),
        beforeExpRevenue: beforeExpRevenue.toString(),
        splittableBeforeExpRevenue: shareableBeforeExpRevenue.toString(),
        reimbursementBeforeExpRevenue: reimbursementBeforeExpRevenue.toString(),
        afterExpRevenue: afterExpRevenue.toString(),
      };
    },
  );
  if (cReports) {
    await ContentReport.bulkCreate(cReports, {
      updateOnDuplicate: [
        'nextupRevenue',
        'owedRevenue',
        'beforeExpiryReportDaysPercentage',
        'beforeExpRevenue',
        'splittableBeforeExpRevenue',
        'reimbursementBeforeExpRevenue',
        'afterExpRevenue',
      ],
    });
  }
  await Promise.all([content.save(), user.save()]);
  return content;
};

export default matchUserContent;
