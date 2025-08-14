import { model, Schema } from 'mongoose';
import { TExpense } from './expenses.interface';

const expensesSchema = new Schema<TExpense>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
});

export const Expense = model<TExpense>('Expense', expensesSchema);
