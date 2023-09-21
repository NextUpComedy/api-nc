import { literal, Op } from 'sequelize';
import {
  Content,
  User,
  Payout,
  Report,
} from 'nc-db-new';
import { userStatus, getStatisticsInitialValues } from '../../helpers/constants';
import { IStatistics } from '../../interfaces';

type IGetAdminStatistics = (
  { fromDate, toDate }: { fromDate: string, toDate: string }
) => Promise<IStatistics>;
let paidRevenuee = 0;
let totalRevenuee = 0;

const getAdminStatistics: IGetAdminStatistics = async ({ fromDate, toDate }) => {
  const [contentsNumber, totalRevenue, payoutsNumber, users] = await Promise.all([
    Content.count({
      where: {
        createdAt: {
          [Op.between]: [fromDate, toDate],
        },
      },
    }),
    Report.sum('totalRevenue', {
      where: {
        createdAt: {
          [Op.between]: [fromDate, toDate],
        },
      },
    }),
    Payout.count({
      where: {
        createdAt: {
          [Op.between]: [fromDate, toDate],
        },
        payoutStatusId: 1,
      },
    }),

    User.findAll({
      where: {
        createdAt: {
          [Op.between]: [fromDate, toDate],
        },
        id: {
          [Op.notIn]: [1, 2, 3, 4, 57, 139],
        },
      },
      attributes: [
        'userStatusId',
        [literal('SUM(paid_revenue)'), 'paidRevenue'],
        [literal('SUM(total_revenue)'), 'totalRevenue'],
        [literal('COUNT(paid_revenue)'), 'usersCount'],
      ],
      group: ['userStatusId'],
    }),

  ]);

  const statistics = users.reduce((
    acc,
    curUsers,
  ) => {
    const {
      userStatusId,
      paidRevenue,
      totalRevenue: userTotalRevenue,
    } = curUsers;
    const usersCount = Number(curUsers.get('usersCount')) as number;

    switch (userStatusId) {
      case userStatus.PENDING:
        acc.counts.pendingUsers = +usersCount;
        acc.revenues.paid.pendingUsers = +paidRevenue;
        acc.revenues.total.pendingUsers = +userTotalRevenue;
        break;
      case userStatus.APPROVED:
        acc.counts.approvedUsers = +usersCount;
        acc.revenues.paid.approvedUsers = +paidRevenue;
        acc.revenues.total.approvedUsers = +userTotalRevenue;
        break;
      case userStatus.REJECTED:
        acc.counts.rejectedUsers = +usersCount;
        acc.revenues.paid.rejectedUsers = +paidRevenue;
        acc.revenues.total.rejectedUsers = +userTotalRevenue;
        break;
      case userStatus.BANNED:
        acc.counts.bannedUsers = +usersCount;
        acc.revenues.paid.bannedUsers = +paidRevenue;
        acc.revenues.total.bannedUsers = +userTotalRevenue;
        break;
      default:
        break;
    }

    acc.counts.allUsers += usersCount;
    acc.revenues.paid.allUsers += +paidRevenue;
    totalRevenuee = +userTotalRevenue;

    paidRevenuee = +paidRevenue;

    return acc;
  }, getStatisticsInitialValues());

  statistics.counts = {
    ...statistics.counts,
    contents: contentsNumber,
    payouts: payoutsNumber,
    totalPayouts: Number(totalRevenuee.toFixed(2)),
    paidPayouts: Number(paidRevenuee.toFixed(2)),
  };
  statistics.revenues.total.earnings = +totalRevenue;

  return statistics;
};

export default getAdminStatistics;
