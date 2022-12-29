import { AES, enc } from 'crypto-js';
import { Settings, ISettings, IVariables } from 'db-models-nc';
import config from '../../config';

const { ENCRYPTION_SECRET_KEY } = config.server;

type IGetDashboardSettings = () => Promise<IVariables>

const getDashboardSettings: IGetDashboardSettings = async () => {
  const oldVars = (await Settings.findOne({ where: { name: 'variables' } })) as ISettings;
  const oldVarsValue = oldVars.value as IVariables;

  const originalPassword = AES
    .decrypt(oldVarsValue.encryptedVariables.viewliftPassword, ENCRYPTION_SECRET_KEY)
    .toString(enc.Utf8);

  const originalStripeKey = AES
    .decrypt(oldVarsValue.encryptedVariables.stripeKey, ENCRYPTION_SECRET_KEY)
    .toString(enc.Utf8);

  return {
    regularVariables: oldVarsValue.regularVariables,
    encryptedVariables: {
      viewliftPassword: originalPassword,
      stripeKey: originalStripeKey,
    },
  };
};

export default getDashboardSettings;
