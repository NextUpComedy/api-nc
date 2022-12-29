import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from './middleware/morgan';
import router from './routes';
import { notFound, serverError } from './middleware';

const app: Application = express();
app.disable('x-powered-by');

app.use([
  express.json({ limit: '2mb' }),
  express.urlencoded({ extended: true, limit: '2mb' }),
  compression(),
  cookieParser(),
  cors({ credentials: true, origin: true }),
]);

app.get('/', (_request, response) => response.json({ message: 'Server Is Running' }));

app.use(morgan);
app.use('/api/v1', router);
app.use([notFound, serverError]);

export default app;
