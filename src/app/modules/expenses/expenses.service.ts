import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
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

const getAllExpensesFromDb = async (query: Record<string, unknown>) => {
  const expensesQuery = new QueryBuilder(
    Expense.find().populate('userId'),
    query
  )
    .search(['title', 'category'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await expensesQuery.modelQuery;

  return result;
};

const getSingleExpensesFromDb = async (id: string) => {
  const result = await Expense.findById({ _id: id }).populate('userId');
  return result;
};

const deleteExpensesFromDB = async (id: string) => {
  const result = await Expense.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const updateExpensesIntoDb = async (id: string, payload: Partial<TExpense>) => {
  const { userId, ...expensesRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updateBasicExpenseInfo = await Expense.findByIdAndUpdate(
      id,
      expensesRemainingData,
      { new: true, runValidators: true, session }
    );

    if (!updateBasicExpenseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update the expense'
      );
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Expense.findById(id).populate('userId');
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update the expense');
  }
};

export const ExpensesServices = {
  createExpensesIntoDb,
  getAllExpensesFromDb,
  getSingleExpensesFromDb,
  deleteExpensesFromDB,
  updateExpensesIntoDb,
};
