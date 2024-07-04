import { Content, User } from 'nc-db-new';
import { errorMessages } from '../../helpers';

interface IContentStatus {
  contentId: number;
  status: boolean;
}

const changeUserContentVatStatus = async (
  userId: number,
  contentStatusArray: IContentStatus[],
): Promise<void> => {
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  const contentIds = contentStatusArray.map((cs) => cs.contentId);
  const userContents = await Content.findAll({
    where: {
      userId,
      id: contentIds,
    },
  });

  if (userContents.length !== contentIds.length) {
    throw errorMessages.VAT_CONTENT_NOT_MATCHED;
  }

  await Promise.all(
    contentStatusArray.map(async ({ contentId, status }) => {
      const newVatStatus = status ? 'true' : 'false';
      await Content.update({ vat: newVatStatus }, { where: { id: contentId } });
    }),
  );
};

export default changeUserContentVatStatus;
