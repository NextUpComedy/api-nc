import { Settings } from 'nc-db-new';

type IGetPlans = () => Promise<{ [key: string]: number }>;

const getPlans: IGetPlans = async () => {
  const plans = (await (Settings.findOne({ where: { name: 'plans' } })))?.value as { [key: string]: number };

  return plans;
};

export default getPlans;
