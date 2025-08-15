import { model, Schema } from 'mongoose';
import { TExpense } from './expenses.interface';

const expensesSchema = new Schema<TExpense>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Expense = model<TExpense>('Expense', expensesSchema);
