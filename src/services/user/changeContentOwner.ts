import {
  Content,
} from 'nc-db-new';

import { IChangeContentOwner } from '../../interfaces/DtoContents';

export const changeContentOwner = async ({ id, oldUserId, newUserId }:
   IChangeContentOwner): Promise<void> => {
  const content = await Content.findOne({
    where: { id, userId: oldUserId },
  });

  if (!content) {
    throw new Error('Content not found or user does not have permission to change ownership.');
  }

  content.userId = newUserId;

  await content.save();
};

export default changeContentOwner;
