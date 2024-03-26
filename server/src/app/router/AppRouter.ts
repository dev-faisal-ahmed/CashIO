import { Router } from 'express';
import { UserRouter } from '../modules/user/User.Router';

export const AppRouter = Router();

AppRouter.use('/auth', UserRouter);
