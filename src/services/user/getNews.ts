import { News } from 'nc-db-new';

const getNews: any = async () => {
  const news = await News.findAll();

  return news;
};

export default getNews;
