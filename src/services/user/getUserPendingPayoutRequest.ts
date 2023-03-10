import { Payout } from 'db-models-nc';
import { constants } from '../../helpers';
import { IGetPendingPayoutRequestDTO } from '../../helpers/dto/services';

const getUserPendingPayoutRequest:IGetPendingPayoutRequestDTO = async ({
  userId,
}) => {
  const payoutStatusId = constants.payoutStatuesIds.PENDING;
  return Payout.findOne({ where: { payoutStatusId, userId } });
};

export default getUserPendingPayoutRequest;
