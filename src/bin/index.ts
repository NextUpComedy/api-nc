import { createServer } from 'http';
import { getDashboardSettings, sequelize } from 'nc-db-new';
import { dto } from '../helpers';
import { IServerAddress } from '../interfaces';
import Logger from '../helpers/logger';
import app from '../app';
import config from '../config';

const server = createServer(app);

const normalizePort = (val: string): number | string | boolean => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(config.server.PORT);

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      Logger.error(`${bind} requires elevated privileges`);
      throw new Error();
    case 'EADDRINUSE':
      Logger.error(`${bind} is already in use`);
      throw new Error();
    default:
      throw error;
  }
};

(async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    const dbSettings = await getDashboardSettings();
    const appSettings = dto.generalDTO.toAppSettingsDTO(dbSettings);
    app.set('settings', appSettings);
    const onListening = (): void => {
      const addr: string | IServerAddress | null = server.address();
      const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : addr !== null
          ? `${addr.address}:${addr.port}`
          : `port ${addr}`;
      Logger.info(`Listening on http://${bind}`);
    };

    server.listen(port as number, process.env.NODE_ENV === 'development' ? '127.0.0.1' : undefined);
    server.on('listening', onListening);
    server.on('error', onError);
  } catch (err) {
    throw new Error(`Unable to connect to the database: ${err}`);
  }
})();
