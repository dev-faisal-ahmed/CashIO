import { z } from 'zod';

const CreateWallet = z.object({
  name: z.string({ required_error: 'Wallet Name is required' }),
  icon: z.string({ required_error: 'Wallet Icon is required' }),
  saving: z.boolean().optional(),
});

export const walletValidation = { CreateWallet };

export type TCreateWalletPayload = z.infer<typeof CreateWallet>;
