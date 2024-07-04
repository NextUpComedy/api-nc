import { Content } from 'nc-db-new';
import { errorMessages } from '../../helpers';

type ChangeVatStatusParams = {
  id: number;
  vat: boolean;
};

const changeVatStatus = async (payload: ChangeVatStatusParams): Promise<any> => {
  const { id, vat } = payload;

  const content = await Content.findOne({
    where: {
      id,
    },
  });

  if (!content) {
    throw errorMessages.NOT_EXIST_ERROR;
  }

  content.vat = vat.toString(); // Ensure the vat is assigned as a string

  await content.save(); // Ensure the changes are saved

  return content;
};

export default changeVatStatus;
