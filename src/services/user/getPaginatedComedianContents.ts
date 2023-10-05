import { Content, ContentReport, IContent } from 'nc-db-new';
import { Op } from 'sequelize';
import fs from 'fs';

type IGetPaginatedUserContents = (
  { userId, page, limit }: { userId: number; page: number; limit: number }
) => Promise<{ rows: IContent[]; count: number }>;

const getPaginatedComedianContents: IGetPaginatedUserContents = async ({
  userId,
  page,
  limit,
}) => {
  try {
    const offset = (page - 1) * limit;

    // Specify the type for userContents
    const userContents: { rows: IContent[]; count: number } = await Content.findAndCountAll({
      where: {
        linkedUserIds: {
          [Op.contains]: [userId], // Check if userId is in the linkeduserids array
        },
      },
      attributes: ['id', 'title', 'runtime', 'launchDate', 'userId'],
      offset,
      limit,
      include: [
        {
          model: ContentReport,
          as: 'contentReports',
          attributes: ['watchedSeconds'],
        },
      ],
    });
    fs.writeFileSync('userContents.json', JSON.stringify(userContents));

    return userContents;
  } catch (error) {
    // Handle errors (e.g., log, throw a custom error, etc.)
    throw new Error('Error fetching paginated user contents');
  }
};

export default getPaginatedComedianContents;
