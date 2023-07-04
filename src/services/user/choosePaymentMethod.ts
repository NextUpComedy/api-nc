import { AES } from 'crypto-js';
import { User } from 'nc-db-new';
import { IChoosePaymentMethod } from '../../interfaces/DtoContents';
import config from '../../config';

const { ENCRYPTION_SECRET_KEY } = config.server;

const choosePaymentMethod = async ({ payload }: IChoosePaymentMethod): Promise<void> => {
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

    const encryptedAccountNumber = AES.encrypt(bankAccountNumber, ENCRYPTION_SECRET_KEY).toString();
    const encryptedSortCode = AES.encrypt(bankSortCode, ENCRYPTION_SECRET_KEY).toString();
    const encryptedAccountHolderName = AES.encrypt(actName, ENCRYPTION_SECRET_KEY).toString();

    user.accountNumber = encryptedAccountNumber;
    user.sortCode = encryptedSortCode;
    user.accountHolderName = encryptedAccountHolderName;

    if (vatPayer === true) {
      user.vatPayer = true;
    }
  } else if (preferredPayoutMethod === 'stripe') {
    const { stripeAccountId } = payload;
    if (!stripeAccountId) {
      throw new Error('Missing stripe account information.');
    }
    const encryptedStripeAccountId = AES.encrypt(stripeAccountId, ENCRYPTION_SECRET_KEY).toString();

    user.stripeAccount = encryptedStripeAccountId;

    if (vatPayer === true) {
      user.vatPayer = true;
    }
  } else if (preferredPayoutMethod === 'ourStripe') {
    // do nothing
  } else {
    throw new Error('Invalid preferred payout method.');
  }

  await user.save();
};

export default choosePaymentMethod;
