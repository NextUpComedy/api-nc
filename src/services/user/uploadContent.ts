import { UserServices } from 'nc-db-new';
import { IUploadContentDTO } from '../../helpers/dto/services';
import { IUpoloadContent } from '../../interfaces';

const uploadContent: IUploadContentDTO = (data: IUpoloadContent) => UserServices.create(data);

export default uploadContent;
