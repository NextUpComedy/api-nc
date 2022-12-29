import winston, { transports } from 'winston';
import { LOGGER_COLORS, LOGGER_LEVELS } from './constants';

const level = (): 'debug'| 'warn' => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

winston.addColors(LOGGER_COLORS);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const Logger = winston.createLogger({
  level: level(),
  levels: LOGGER_LEVELS,
  format,
  transports: [new transports.Console()],
});

export default Logger;
