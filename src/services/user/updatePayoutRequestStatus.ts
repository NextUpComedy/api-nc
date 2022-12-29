import { IUpdatePayoutRequestStatusDTO } from '../../helpers/dto/services';

const updatePayoutRequestStatus:IUpdatePayoutRequestStatusDTO = async ({
  payoutRequest, payoutStatusId, updatedBy,
}) => {
  payoutRequest.set('payoutStatusId', payoutStatusId);
  payoutRequest.set('updatedBy', updatedBy);
  return payoutRequest.save();
};

export default updatePayoutRequestStatus;
