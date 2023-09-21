import { User } from 'nc-db-new';

const getPaymentDetails: any = (id: number) => User.findOne({
  where: { id },
  attributes: [
    'stripeAccount',
    'accountNumber',
    'accountHolderName',
    'bankName',
    'bankAddress',
    'ibanNumber',
    'swiftCode',
    'bicCode',
    'preferredPayoutMethod',
    'sortCode',
    'vatPayer',
  ],
})
  .then((user: any) => {
    const {
      stripeAccount,
      accountNumber,
      accountHolderName,
      bankName,
      bankAddress,
      ibanNumber,
      swiftCode,
      bicCode,
      preferredPayoutMethod,
      sortCode,
      vatPayer,
    } = user;
    const paymentDetails = {
      stripeAccount,
      accountNumber,
      accountHolderName,
      bankName,
      bankAddress,
      ibanNumber,
      swiftCode,
      bicCode,
      preferredPayoutMethod,
      sortCode,
      vatPayer,
    };
    return paymentDetails;
  })
  .catch((err: any) => {
    throw err;
  });
export default getPaymentDetails;
