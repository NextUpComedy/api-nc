import { News } from 'nc-db-new';

const deleteNews = async (newsId: string): Promise<void> => {
  const news = await News.findOne({
    where: { id: newsId },
  });

  if (!news) {
    throw new Error('News not found.');
  }

  await news.destroy();
};

export default deleteNews;
