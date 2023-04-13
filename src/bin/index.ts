import { createServer } from 'http';
import { getDashboardSettings, sequelize } from 'nc-db-new';
import { dto } from '../helpers';
import Logger from '../helpers/logger';
import app from '../app';

const server = createServer(app);

(async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    const dbSettings = await getDashboardSettings();
    const appSettings = dto.generalDTO.toAppSettingsDTO(dbSettings);
    app.set('settings', appSettings);
    Logger.info('Server listening on port 5000 ...');

    server.listen(8000, '0.0.0.0');
  } catch (err) {
    throw new Error(`Unable to connect to the database: ${err}`);
  }
})();
