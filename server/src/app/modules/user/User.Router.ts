import { Router } from 'express';
import { ValidationHandler } from '../../middlewares/ValidationHandler';
import { UserValidation } from './User.Validation';
import { UserController } from './User.Controller';

export const UserRouter = Router();

UserRouter.post(
  '/register',
  ValidationHandler(UserValidation.CreateUserValidationSchema),
  UserController.CreateUser
);

UserRouter.post(
  '/login',
  ValidationHandler(UserValidation.LoginValidationSchema),
  UserController.Login
);
