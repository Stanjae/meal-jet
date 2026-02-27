import z from 'zod';
import { ROLES } from '@/lib/constants';
import { emailSchema, enumSchema, passwordSchema, stringSchema } from './zod';

export const signupSchema = z.object({
  username: stringSchema()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  email: emailSchema(),

  password: passwordSchema(),

  role: enumSchema(ROLES),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: emailSchema(),

  password: passwordSchema(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
