import { Content, ContentReport } from 'nc-db-new';

type IAddComedianContent = (
    { contentIds, userId }: { contentIds: number[]; userId: number }
) => Promise<void>;

const addComedianContent: IAddComedianContent = async ({
  contentIds,
  userId,
}) => {
  try {
    // Find all the contents that have the given contentIds
    const contents = await Content.findAll({
      where: {
        id: contentIds,
      },
      attributes: ['id', 'watchedSeconds', 'reportId', 'paid'],
    });

    // Find all the contentReports that have the given contentIds
    const contentReports = await ContentReport.findAll({
      where: {
        contentId: contentIds,
      },
    });

    // Update the contents and contentReports
    await Promise.all([
      contents.map(async (content) => {
        const linkedUserIds = content.linkedUserIds || [];
        await content.update({
          linkedUserIds: [...linkedUserIds, userId],
        });
      }),
      contentReports.map(async (contentReport) => {
        const linkedUserIds = contentReport.linkedUserIds || [];
        await contentReport.update({
          linkedUserIds: [...linkedUserIds, userId],
        });
      }),
    ]);
  } catch (error) {
    // Handle errors (e.g., log, throw a custom error, etc.)
    throw new Error('Error adding comedian content');
  }
};

export default addComedianContent;
