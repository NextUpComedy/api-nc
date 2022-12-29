import { AES } from 'crypto-js';
import { Settings, ISettings, IVariables } from 'db-models-nc';
import config from '../../config';

const { ENCRYPTION_SECRET_KEY } = config.server;

type IEditDashboardSettings = (_: IVariables) => Promise<IVariables>

const editDashboardSettings: IEditDashboardSettings = async ({
  encryptedVariables,
  regularVariables,
}) => {
  const oldVars = (await Settings.findOne({ where: { name: 'variables' } })) as ISettings;
  const hashedPassword = AES
    .encrypt(encryptedVariables.viewliftPassword, ENCRYPTION_SECRET_KEY)
    .toString();

  const hashedStripeKey = AES
    .encrypt(encryptedVariables.stripeKey, ENCRYPTION_SECRET_KEY)
    .toString();

  oldVars.value = {
    regularVariables,
    encryptedVariables: {
      viewliftPassword: hashedPassword,
      stripeKey: hashedStripeKey,
    },
  };
  await oldVars.save();

  const newDashboardVars = {
    encryptedVariables,
    regularVariables,
  };

  return newDashboardVars;
};

export default editDashboardSettings;
