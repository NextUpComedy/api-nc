import { Payout } from 'db-models-nc';
import { IAskForPayoutDTO } from '../../helpers/dto/services';

const askForPayout:IAskForPayoutDTO = async ({
  amount, userId, createdBy, updatedBy, payoutStatusId,
}) => {
  const pendingPayout = await Payout.findOne({ where: { payoutStatusId, userId } });
  if (pendingPayout) {
    pendingPayout.amount = amount;
    return pendingPayout.save();
  }
  return Payout.create({
    amount,
    userId,
    updatedBy,
    createdBy,
    payoutStatusId,
  });
};

export default askForPayout;
