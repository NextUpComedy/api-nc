import { User } from 'nc-db-new';
import { IAddUser } from '../../interfaces';
import { AddUserDTO } from '../../helpers/dto/services';

const addComedian: AddUserDTO = async (data: IAddUser) => {
  try {
    const comedian = await User.create(data);
    await comedian.update({ linkedAgentId: data.createdBy });
    return comedian;
  } catch (error) {
    throw new Error('Failed to add comedian:');
  }
};

export default addComedian;
