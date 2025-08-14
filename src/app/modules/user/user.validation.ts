import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().nonempty('Email is required'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be at most 32 characters long'),
    profileImg: z.string().nonempty('Profile image is required'),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
