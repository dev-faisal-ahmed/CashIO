import { Router } from 'express';
import { AuthGuard } from '../../middlewares/AuthGuard';
import { ValidationHandler } from '../../middlewares/ValidationHandler';
import { SourceValidation } from './Source.Validation';
import { SourceController } from './Source.Controller';

export const SourceRouter = Router();

SourceRouter.post(
  '/',
  AuthGuard(),
  ValidationHandler(SourceValidation.CreateSourceSchema),
  SourceController.CreateSource
);
