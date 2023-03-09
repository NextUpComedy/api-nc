import { User } from 'nc-db-new';
import { IAddUser } from '../../interfaces';
import { GetUserByEmailDTO, GetUserByIdDTO, AddUserDTO } from '../../helpers/dto/services';

const getUserByEmail: GetUserByEmailDTO = (email: string) => User.findOne({ where: { email } });

const getUserById: GetUserByIdDTO = (id: number) => User.findOne({
  where: { id },
  attributes: { exclude: ['password'] },
});

const getAllUserDataById: GetUserByIdDTO = (id: number) => User.findOne({
  where: { id },
});

const addUser: AddUserDTO = (data: IAddUser) => User.create(data);

export {
  getUserByEmail,
  getUserById,
  addUser,
  getAllUserDataById,
};
