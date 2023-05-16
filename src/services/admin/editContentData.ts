import { Content } from 'nc-db-new';
import { errorMessages } from '../../helpers';
import { getUserById } from '../user';

type EditContentDataParams = {
  userId: number;
  launchDate: string;
  filmingCosts: string;
  feePaid: string;
  advance: string;
  recoveredCosts: string;
  otherRevenue?: JSON;
  id: number;
};

const editContentData = async (payload: EditContentDataParams): Promise<any> => {
  const {
    userId, id, launchDate, filmingCosts, feePaid, advance, recoveredCosts, otherRevenue,
  } = payload;

  const content = await Content.findOne({
    where: {
      id,
    },
  });
  const user = await getUserById(userId);
  if (!user) throw errorMessages.NOT_EXIST_ERROR;

  if (!content) {
    throw new Error('Content not found.');
  }
  const oldOtherRevenue = JSON.parse(JSON.stringify(content.otherRevenue));

  content.launchDate = launchDate;
  content.filmingCosts = filmingCosts;
  content.feePaid = feePaid;
  content.advance = advance;
  content.recoveredCosts = recoveredCosts;
  content.userId = userId;

  if (otherRevenue) {
    content.otherRevenue = otherRevenue;
  }
  const newOtherRevenue = JSON.parse(JSON.stringify(otherRevenue));
  await content.save();
  if (oldOtherRevenue === newOtherRevenue) {
    await user.save();
  } else if (oldOtherRevenue !== newOtherRevenue) {
    let servicesRevenue = 0;
    if (otherRevenue !== null && otherRevenue !== undefined) {
      const otherRevenueString = JSON.stringify(otherRevenue);
      const otherRevenueObj = JSON.parse(otherRevenueString);
      servicesRevenue = otherRevenueObj.reduce((accumulator:any, current:any) => accumulator
    + parseInt(current.revenue, 10), 0);
    }
    const oldServicesRevenue = oldOtherRevenue
      ? oldOtherRevenue.reduce((accumulator: any, current: any) => accumulator
    + parseInt(current.revenue, 10), 0) : 0;
    const newServicesRevenue = newOtherRevenue
      ? newOtherRevenue.reduce((accumulator:any, current:any) => accumulator
       + parseInt(current.revenue, 10), 0) : 0;
    let difference = 0;
    if (oldServicesRevenue > newServicesRevenue) {
      difference = oldServicesRevenue - newServicesRevenue;
    } else {
      difference = newServicesRevenue - oldServicesRevenue;
    }

    let totalRevenue = Number(user?.totalRevenue);
    totalRevenue += Number(servicesRevenue);
    user.totalRevenue = (totalRevenue - difference).toString();
    await user.save();
  }

  return content;
};

export default editContentData;
