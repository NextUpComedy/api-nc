import { Settings, ISettings } from 'db-models-nc';

type IDeletePlan = (planId: string) => Promise<{ [key: string]: number }>;

const deletePlan: IDeletePlan = async (planId) => {
  const plans = await (Settings.findOne({ where: { name: 'plans' } })) as ISettings;

  if (!plans) throw new Error('No plans found');
  const oldPlans = plans?.value as { [key: string]: number };
  const { [planId]: _deletedPlan, ...otherPlans } = oldPlans;
  plans.value = otherPlans as { [key: string]: number };
  await plans.save();

  return plans.value as { [key: string]: number };
};

export default deletePlan;
