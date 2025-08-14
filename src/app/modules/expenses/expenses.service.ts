import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TExpense } from './expenses.interface';
import { Expense } from './expenses.model';

export const createExpensesIntoDb = async (payload: TExpense) => {
  // Check if same user already has an expense with this title
  const existingExpense = await Expense.findOne({
    title: payload.title,
    userId: payload.userId,
    isDeleted: false,
  });

  if (existingExpense) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Expense with this title already exists'
    );
  }

  // Create new expense
  const newExpense = await Expense.create(payload);
  return newExpense;
};

export const ExpensesServices = {
  createExpensesIntoDb,
};
