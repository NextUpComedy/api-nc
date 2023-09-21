import { User } from 'nc-db-new';
import { IUpdateUserPaidRevenueDTO } from '../../helpers/dto/services';

const updateUserPaidRevenue:IUpdateUserPaidRevenueDTO = async ({
  paidRevenue,
  userId: id,
  transaction,
}) => {
  await User.update({ paidRevenue }, { where: { id }, transaction });
};

export default updateUserPaidRevenue;
