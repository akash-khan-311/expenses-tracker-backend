import { z } from 'zod';

const expensesValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .nonempty('Title is required')
      .min(3, 'Title must be at least 3 characters long')
      .max(50, 'Title must be at most 50 characters long'),
    amount: z
      .number()
      .nonnegative('Amount must be a non-negative number')
      .min(0, 'Amount must be at least 0'),
    date: z.date(),
  }),
});

export const ExpensesValidation = {
  expensesValidationSchema,
};
