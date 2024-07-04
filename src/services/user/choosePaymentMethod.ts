import { AES } from 'crypto-js';
import { Content, User } from 'nc-db-new';
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
    if (vatPayer) {
      user.vatPayer = true;
      const userContents = await Content.findAndCountAll({ where: { userId } });
      await Promise.all(
        userContents.rows.map(async (content) => {
          await Content.update({ vat: 'true' }, { where: { id: content.id } });
        }),
      );
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
  } else if (preferredPayoutMethod === 'international') {
    const {
      accountHolderName, bankName, ibanNumber, swiftCode, bicCode, bankAccountNumber, bankAddress,
    } = payload;
    if (!accountHolderName || !bankName || !ibanNumber || !swiftCode
      || !bicCode || !bankAccountNumber || !bankAddress) {
      console.log(

        bankAccountNumber,
      );
      throw new Error('Missing international account information.');
    }
    const encryptedAccountHolderName = AES.encrypt(accountHolderName, ENCRYPTION_SECRET_KEY)
      .toString();
    const encryptedBankName = AES.encrypt(bankName, ENCRYPTION_SECRET_KEY).toString();
    const encryptedIbanNumber = AES.encrypt(ibanNumber, ENCRYPTION_SECRET_KEY).toString();
    const encryptedSwiftCode = AES.encrypt(swiftCode, ENCRYPTION_SECRET_KEY).toString();
    const encryptedBicCode = AES.encrypt(bicCode, ENCRYPTION_SECRET_KEY).toString();
    const encryptedAccountNumber = AES.encrypt(bankAccountNumber, ENCRYPTION_SECRET_KEY).toString();
    const encryptedBankAddress = AES.encrypt(bankAddress, ENCRYPTION_SECRET_KEY).toString();
    user.accountHolderName = encryptedAccountHolderName;
    user.bankName = encryptedBankName;
    user.ibanNumber = encryptedIbanNumber;
    user.swiftCode = encryptedSwiftCode;
    user.bicCode = encryptedBicCode;
    user.accountNumber = encryptedAccountNumber;
    user.bankAddress = encryptedBankAddress;
  } else {
    throw new Error('Invalid preferred payout method.');
  }

  await user.save();
};

export default choosePaymentMethod;
