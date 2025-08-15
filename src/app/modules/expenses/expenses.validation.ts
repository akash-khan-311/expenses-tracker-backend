import { z } from 'zod';

const expensesValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .nonempty('Title is required')
      .min(3, 'Title must be at least 3 characters long')
      .max(50, 'Title must be at most 50 characters long'),
    amount: z
      .string()
      .nonempty('Amount is required')
      .min(0, 'Amount must be at least 0'),
    date: z.string(),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    amount: z.number().optional(),
    date: z.string().optional(),
    category: z.string().optional(),
    isDeleted: z.boolean().optional(),
    userId: z.string().optional(),
  }),
});

export const ExpensesValidation = {
  expensesValidationSchema,
  updateValidationSchema,
};
