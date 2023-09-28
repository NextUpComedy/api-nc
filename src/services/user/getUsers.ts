import { User } from 'nc-db-new';
import { userRoles } from '../../helpers/constants';
import { IGetPaginatedUsersDTO } from '../../helpers/dto/services';

const getPaginatedUsers: IGetPaginatedUsersDTO = ({ page, limit }) => {
  if (!page && !limit) {
    return User.findAll({
      where: { userRoleId: userRoles.AGENT },
      attributes: ['id', 'name', 'email', 'image'],
    });
  }

  const offset = (page - 1) * limit;

  return User.findAndCountAll({
    offset,
    limit,
    where: { userRoleId: userRoles.AGENT },
    attributes: ['id', 'name', 'email', 'image'],
    order: [['id', 'DESC']],
  });
};

export default getPaginatedUsers;
