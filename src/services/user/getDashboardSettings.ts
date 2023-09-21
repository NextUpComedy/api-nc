import { AES, enc } from 'crypto-js';
import { Settings, ISettings, IVariables } from 'nc-db-new';
import config from '../../config';

const { ENCRYPTION_SECRET_KEY } = config.server;

type IGetDashboardSettings = () => Promise<IVariables>

const getDashboardSettings: IGetDashboardSettings = async () => {
  const oldVars = (await Settings.findOne({ where: { name: 'variables' } })) as ISettings;
  const oldVarsValue = oldVars.value as IVariables;
  const originalApiKey = AES
    .decrypt(oldVarsValue.encryptedVariables.uscreenApiKey, ENCRYPTION_SECRET_KEY)
    .toString(enc.Utf8);

  const originalStripeKey = AES
    .decrypt(oldVarsValue.encryptedVariables.stripeKey, ENCRYPTION_SECRET_KEY)
    .toString(enc.Utf8);

  return {
    regularVariables: oldVarsValue.regularVariables,
    encryptedVariables: {
      uscreenApiKey: originalApiKey,
      stripeKey: originalStripeKey,
    },
  };
};

export default getDashboardSettings;
