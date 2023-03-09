import { sequelize, migration as umzug } from 'nc-db-new';

(async (): Promise<void> => {
  await umzug.up();
  sequelize.close();
})();
