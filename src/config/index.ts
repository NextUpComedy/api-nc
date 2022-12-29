import dotenv from 'dotenv';
import path from 'path';
import server from './server';
import database from './database';
import email from './email';

if (!process.env.NODE_ENV) {
  throw new Error('You have to set NODE_ENV');
}

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`) });
}

export default {
  server: server(),
  database: database(),
  email: email(),
};
