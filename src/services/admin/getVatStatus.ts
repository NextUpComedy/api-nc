import { Content } from 'nc-db-new';

type GetVatStatusParams = {
  id: number;
};

const getVatStatus = async (payload: GetVatStatusParams): Promise<any> => {
  const { id } = payload;

  const content = await Content.findOne({
    where: {
      id,
    },
  });

  if (!content) {
    throw new Error('Content not found.');
  }

  return {
    id: content.id,
    vat: content.vat,
  };
};

export default getVatStatus;
