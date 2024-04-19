import { z } from 'zod';
import { sourceTypes } from './source.constants';

const CreateSources = z.object({
  name: z.string({ required_error: 'Name is required' }),
  sourceType: z.enum([...(sourceTypes as [string, ...string[]])], {
    required_error: 'Source type is required',
  }),
  icon: z.string({ required_error: 'Name is required' }),
});

export const sourceValidation = { CreateSources };

export type TCreateSourcePayload = z.infer<typeof CreateSources>;
