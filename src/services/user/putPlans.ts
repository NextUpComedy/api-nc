import { Settings } from 'nc-db-new';

type IPutPlans = (plans: { [key: string]: number }) => Promise<{ [key: string]: number }>;

const putPlans: IPutPlans = async (newPlans) => {
  const plans = await (Settings.findOne({ where: { name: 'plans' } }));
  if (!plans) throw new Error('No plans found');
  plans.value = { ...plans.value as { [key: string]: number }, ...newPlans };
  await plans.save();

  return plans.value as { [key: string]: number };
};

export default putPlans;
