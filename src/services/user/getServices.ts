import { UserServices } from 'nc-db-new';

const getServices: any = async () => {
  const services = await UserServices.findAll();

  return services;
};

export default getServices;
