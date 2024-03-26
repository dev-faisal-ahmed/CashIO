import { z } from 'zod';

const CreateUserValidationSchema = z.object({
  name: z.string({ required_error: 'Name is Required' }),
  email: z
    .string({ required_error: 'Email is Required' })
    .email({ message: 'Please provide a valid email' }),
});

export const UserValidation = { CreateUserValidationSchema };

// types
export type CreateUserValidationSchemaType = z.infer<
  typeof CreateUserValidationSchema
>;
