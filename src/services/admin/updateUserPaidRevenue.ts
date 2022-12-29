import { User } from 'db-models-nc';
import { IUpdateUserPaidRevenueDTO } from '../../helpers/dto/services';

const updateUserPaidRevenue:IUpdateUserPaidRevenueDTO = async ({
  paidRevenue,
  userId: id,
  transaction,
}) => {
  await User.update({ paidRevenue }, { where: { id }, transaction });
};

export default updateUserPaidRevenue;
