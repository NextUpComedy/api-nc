import { IUpdatePayoutRequestStatusDTO } from '../../helpers/dto/services';

const updatePayoutStatus:IUpdatePayoutRequestStatusDTO = ({
  payoutRequest,
  payoutStatusId,
  transaction,
  rejectionReason,
  updatedBy,
}) => {
  payoutRequest.set('payoutStatusId', payoutStatusId);
  payoutRequest.set('updatedBy', updatedBy);

  if (rejectionReason) payoutRequest.set('rejectionReason', rejectionReason);
  return payoutRequest.save({ transaction });
};

export default updatePayoutStatus;
