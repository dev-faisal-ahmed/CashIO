import { z } from 'zod';
import { TypesOfSource } from './Source.Constants';

const CreateSourceSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  type: z.enum([...(TypesOfSource as [string, ...string[]])]),
  icon: z.string({ required_error: 'Icon is required' }),
});

export const SourceValidations = { CreateSourceSchema };

export type CreateSourceSchemaType = z.infer<typeof CreateSourceSchema>;
