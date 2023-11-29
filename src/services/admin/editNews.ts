import { News } from 'nc-db-new';

const editNewsData = async (payload: any): Promise<any> => {
  const {
    id, title, newsContent, link, image, userId,
  } = payload;
  console.log(payload);

  const news = await News.findOne({
    where: {
      id,
    },
  });

  if (!news) {
    throw new Error('News not found.');
  }
  news.title = title;
  news.newsContent = newsContent;
  news.link = link;
  news.image = image;
  news.userId = userId;
  await news.save();
  return news;
};

export default editNewsData;
