import { Content } from 'nc-db-new';

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

  if (!content) {
    throw new Error('Content not found.');
  }

  content.launchDate = launchDate;
  content.filmingCosts = filmingCosts;
  content.feePaid = feePaid;
  content.advance = advance;
  content.recoveredCosts = recoveredCosts;
  content.userId = userId;

  if (otherRevenue) {
    content.otherRevenue = otherRevenue;
  }

  await content.save();

  return content;
};

export default editContentData;
