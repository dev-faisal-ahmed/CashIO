import { z } from 'zod';

const CreateWalletValidationSchema = z.object({
  name: z.string({ required_error: 'Wallet Name is required' }),
  icon: z.string({ required_error: 'Wallet Icon is required' }),
  saving: z.boolean({}).optional(),
});

export const WalletValidation = { CreateWalletValidationSchema };

export type CreateWalletValidationSchemaType = z.infer<
  typeof CreateWalletValidationSchema
>;
