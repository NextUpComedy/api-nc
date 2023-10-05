import { News } from 'nc-db-new';
import { AddNewsDto } from '../../helpers/dto/services';
import { IAddNews } from '../../interfaces';

const addNews: AddNewsDto = (data: IAddNews) => News.create(data);

export {
  addNews,
};
