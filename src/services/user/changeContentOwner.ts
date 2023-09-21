import {
  Content,
} from 'nc-db-new';

import Big from 'big.js';
import { errorMessages } from '../../helpers';
import { IChangeContentOwner } from '../../interfaces/DtoContents';
import { getUserById } from './user';

const changeContentOwner = async ({ id, oldUserId, newUserId }:
   IChangeContentOwner): Promise<void> => {
  const oldUser = await getUserById(oldUserId);
  const newUser = await getUserById(newUserId);

  const content = await Content.findOne({
    where: { id, userId: oldUserId },
  });
  if (!oldUser) throw errorMessages.NOT_EXIST_ERROR;
  if (!newUser) throw errorMessages.NOT_EXIST_ERROR;

  if (!content) {
    throw new Error('Content not found or user does not have permission to change ownership.');
  }
  const owedAccRevenue = Number(content.owedAccRevenue);
  content.userId = newUserId;

  newUser.totalRevenue = Big(newUser.totalRevenue).plus(owedAccRevenue);

  oldUser.totalRevenue = Big(oldUser.totalRevenue).minus(owedAccRevenue);

  await content.save();
  await newUser.save();
  await oldUser.save();
};

export default changeContentOwner;
