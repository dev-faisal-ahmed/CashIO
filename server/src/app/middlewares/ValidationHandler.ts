import { AnyZodObject } from 'zod';
import { TryCatch } from '../utils/TryCatch';

export const ValidationHandler = (schema: AnyZodObject) => {
  return TryCatch(async (req, _, next) => {
    await schema.parseAsync(req.body);
    next();
  });
};
