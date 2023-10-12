import { Content, ContentReport } from 'nc-db-new';
import { AddContentDTO, AddContentReportDTO } from '../../helpers/dto/services';
import { IAddContent, IAddContentReport } from '../../interfaces';

const addContent: AddContentDTO = (data: IAddContent) => Content.create(data);
const addContentReport: AddContentReportDTO = (data: IAddContentReport) => ContentReport
  .create(data);

export {
  addContent,
  addContentReport,
};
