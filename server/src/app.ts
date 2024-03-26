import express, { Response } from 'express';
import cors from 'cors';
import { GlobalErrorHandler } from './app/middlewares/GlobalErrorHandler';
import { AppRouter } from './app/router/AppRouter';

export const App = express();

// parser
App.use(express.json());
App.use(cors());

// all routes
App.use('/api/v1', AppRouter);

App.get('/', async (_, response: Response) => {
  response.status(200).json({ ok: true, message: 'Hello Form Server' });
});

// global error handler
App.use(GlobalErrorHandler);
