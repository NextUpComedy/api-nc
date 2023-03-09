import { Content, IContent } from 'nc-db-new';

type IGetPaginatedUserContents = (
  { userId, page, limit }: {userId: number, page: number, limit: number}
) => Promise<{ rows: IContent[]; count: number; }>;

const getPaginatedUserContents: IGetPaginatedUserContents = async ({ userId, page, limit }) => {
  const offset = (page - 1) * limit;

  const userContents = await Content.findAndCountAll({
    where: { userId },
    offset,
    limit,
  });

  return userContents;
};

export default getPaginatedUserContents;
