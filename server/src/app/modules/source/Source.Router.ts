import { Router } from 'express';
import { AuthGuard } from '../../middlewares/AuthGuard';
import { ValidationHandler } from '../../middlewares/ValidationHandler';
import { SourceValidations } from './Source.Validation';
import { SourceController } from './Source.Controller';

export const SourceRouter = Router();

SourceRouter.post(
  '/',
  AuthGuard(),
  ValidationHandler(SourceValidations.CreateSourceSchema),
  SourceController.CreateSource
);
