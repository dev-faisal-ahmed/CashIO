import { z } from 'zod';
import { IncomeExpensesConstant } from '../../global/Global.Constants';

const CreateSourceSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  type: z.enum([...(IncomeExpensesConstant as [string, ...string[]])]),
  icon: z.string({ required_error: 'Icon is required' }),
});

export const SourceValidation = { CreateSourceSchema };

export type CreateSourceSchemaType = z.infer<typeof CreateSourceSchema>;
