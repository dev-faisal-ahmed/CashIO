import { Router } from 'express';
import { authGuard } from '../../middlewares/auth.guard';
import { sourceController } from './source.controller';
import { validationHandler } from '../../middlewares/validation.handler';
import { sourceValidation } from './source.validation';

export const sourceRouter = Router();

sourceRouter.post(
  '/',
  authGuard,
  validationHandler(sourceValidation.CreateSources),
  sourceController.createSource
);
