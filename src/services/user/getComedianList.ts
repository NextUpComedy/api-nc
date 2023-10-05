import { User } from 'nc-db-new';

const getComedianList = async (userId: number): Promise<any> => {
  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found for the given API ID');
    }

    const comedians = await User.findAll({
      where: { linkedAgentId: user.id },
      attributes: ['id', 'name', 'email', 'totalRevenue', 'paidRevenue'],
    });
    return comedians;
  } catch (error) {
    throw new Error('Failed to retrieve comedian list');
  }
};

export default getComedianList;
