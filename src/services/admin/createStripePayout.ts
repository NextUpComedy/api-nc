import Big from 'big.js';
import { getDashboardSettings } from 'nc-db-new';
import Stripe from 'stripe';

export default (async ({
  amountInPounds,
  stripeAccount,
}:{amountInPounds:Big, stripeAccount:string}):Promise<void> => {
  const { stripeKey, maxCount: maxNetworkRetries } = await getDashboardSettings();
  const stripe = new Stripe(stripeKey, { typescript: true, apiVersion: '2022-08-01', maxNetworkRetries });
  const amount = amountInPounds.times(100).round(undefined, 0).toNumber();
  await stripe.payouts.create(
    {
      amount,
      currency: 'gbp',
      method: 'standard',
    },
    {
      stripeAccount,
    },
  );
});
