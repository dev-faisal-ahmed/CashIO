import { Router } from 'express';
import { UserRouter } from '../modules/user/User.Router';
import { SourceRouter } from '../modules/source/Source.Router';

export const AppRouter = Router();

AppRouter.use('/auth', UserRouter);
AppRouter.use('/source', SourceRouter);
