import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
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
// Serve the specific verification file
app.get('/.well-known/pki-validation/B47AD9972786B55A3333F7B95AC6814F.txt', (_req, res) => {
  const filePath = path.join(__dirname, 'B47AD9972786B55A3333F7B95AC6814F.txt');
  res.sendFile(filePath);
});

app.use(morgan);
app.use('/api/v1', router);
app.use([notFound, serverError]);

export default app;
