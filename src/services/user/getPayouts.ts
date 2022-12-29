import { Payout, PayoutStatus } from 'db-models-nc';
import { IGetPaginatedPayoutsDTO } from '../../helpers/dto/services';

const getPayouts:IGetPaginatedPayoutsDTO = async ({
  page, limit, payoutStatusId, sort, userId,
}) => Payout.findAndCountAll({
  limit,
  offset: limit && (page - 1) * limit,
  order: sort && [['updatedAt', sort]],
  where: ((payoutStatusId && userId) ? { payoutStatusId, userId } : undefined)
  || ((payoutStatusId && !userId) ? { payoutStatusId } : undefined)
  || ((!payoutStatusId && userId) ? { userId } : undefined),
  include: { model: PayoutStatus, as: 'payoutStatus', attributes: ['name'] },
});

export default getPayouts;
