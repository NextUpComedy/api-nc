import { Op, col } from 'sequelize';
import { User, UserRole } from 'db-models-nc';
import { constants } from '../../helpers';
import { GetUsersStatusDTO } from '../../helpers/dto/services';

const getUsersStatus: GetUsersStatusDTO = (statusId: number, { page, limit }) => {
  if (!page && !limit) {
    return User.findAll({
      where: {
        [Op.and]: [
          { userStatusId: statusId },
          {
            userRoleId: {
              [Op.notIn]: [
                constants.userRoles.MASTER_ADMIN,
                constants.userRoles.SYSTEM,
              ],
            },
          },
        ],
      },
      attributes: {
        exclude: ['password', 'updatedAt'],
        include: [[col('userRole.name'), 'roleName']],
      },
      include: {
        model: UserRole,
        as: 'userRole',
        attributes: [],
      },
      order: [['id', 'DESC']],
    });
  }
  const offset = (page - 1) * limit;

  return User.findAndCountAll({
    offset,
    limit,
    where: {
      [Op.and]: [
        { userStatusId: statusId },
        {
          userRoleId: {
            [Op.notIn]: [
              constants.userRoles.MASTER_ADMIN,
              constants.userRoles.SYSTEM,
            ],
          },
        },
      ],
    },
    attributes: {
      exclude: ['password', 'updatedAt'],
      include: [[col('userRole.name'), 'roleName']],
    },
    include: {
      model: UserRole,
      as: 'userRole',
      attributes: [],
    },
    order: [['id', 'DESC']],
  });
};

export default getUsersStatus;
