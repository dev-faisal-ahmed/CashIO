import { z } from 'zod';

const CreateWallet = z.object({
  name: z.string({ required_error: 'Wallet Name is required' }),
  icon: z.object(
    {
      group: z.string({ required_error: 'Icon Group is required' }),
      name: z.string({ required_error: 'Icon Name is required' }),
    },
    { required_error: 'Icon is required' }
  ),
  saving: z.boolean().optional(),
});

export const walletValidation = { CreateWallet };
export type TCreateWalletPayload = z.infer<typeof CreateWallet>;
