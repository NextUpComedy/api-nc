import { Payout, User } from 'db-models-nc';
import { IGetPayoutByIdDTO } from '../../helpers/dto/services';

const getPayoutRequestById: IGetPayoutByIdDTO = (payoutId: number) => Payout.findByPk(payoutId, {
  include: {
    model: User,
  },
});

export default getPayoutRequestById;
