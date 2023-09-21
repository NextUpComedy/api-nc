import { User } from 'nc-db-new';
import { IChoosePaymentMethod } from '../../interfaces/DtoContents';

const choosePaymentMethod = async ({ payload }:
    IChoosePaymentMethod): Promise<void> => {
  const { preferredPayoutMethod, userId, vatPayer } = payload;
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found.');
  }
  if (user.preferredPayoutMethod !== null) {
    throw new Error('User already has a preferred payout method.');
  }

  user.preferredPayoutMethod = preferredPayoutMethod;
  if (preferredPayoutMethod === 'bank') {
    const {
      bankAccountNumber, bankSortCode, actName,
    } = payload;
    if (!bankAccountNumber || !bankSortCode || !actName) {
      throw new Error('Missing bank account information.');
    }
    user.accountNumber = bankAccountNumber;
    user.sortCode = bankSortCode;
    user.accountHolderName = actName;
    if (vatPayer === true) {
      user.vatPayer = true;
    }
  } else if (preferredPayoutMethod === 'stripe') {
    const { stripeAccountId } = payload;
    if (!stripeAccountId) {
      throw new Error('Missing stripe account information.');
    }
    if (vatPayer === true) {
      user.vatPayer = true;
    }
    user.stripeAccount = stripeAccountId;
  } else if (preferredPayoutMethod === 'ourStripe') {
    // do nothing
  } else {
    throw new Error('Invalid preferred payout method.');
  }

  await user.save();
};

export default choosePaymentMethod;
