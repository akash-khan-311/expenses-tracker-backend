import z from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().nonempty('Email is required'),
    password: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be at most 32 characters long'),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().nonempty('Refresh token is required'),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
};
