import { Payout, PayoutStatus } from 'nc-db-new';
import { IGetPaginatedAccountantPayoutsDTO } from '../../helpers/dto/services';

const getAgentPayouts:IGetPaginatedAccountantPayoutsDTO = async ({
  page, limit, payoutStatusId, sort, userId,
}) => Payout.findAndCountAll(

  {
    limit,
    offset: limit && (page - 1) * limit,
    order: sort && [['updatedAt', sort]],
    where: { userId, ...(payoutStatusId ? { payoutStatusId } : {}) },
    include: { model: PayoutStatus, as: 'payoutStatus', attributes: ['name'] },
  },

);

export default getAgentPayouts;
