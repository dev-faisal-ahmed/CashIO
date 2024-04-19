import { z } from 'zod';

const RegisterUser = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide a valid email' }),
});

const LoginUser = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Provide a valid email' }),
});

export const userValidation = { RegisterUser, LoginUser };

export type TRegistrationPayload = z.infer<typeof RegisterUser>;
export type TLoginPayload = z.infer<typeof LoginUser>;
