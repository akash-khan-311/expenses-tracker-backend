import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { ExpensesServices } from './expenses.service';

const createExpenses = catchAsync(async (req, res) => {
  const result = await ExpensesServices.createExpensesIntoDb(req.body);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Expense created successfully',
      data: result,
    });
  }
});

const getAllExpenses = catchAsync(async (req, res) => {
  const result = await ExpensesServices.getAllExpensesFromDb(req.query);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expenses fetched successfully',
      data: result,
    });
  }
});

const getSingleExpenses = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ExpensesServices.getSingleExpensesFromDb(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense fetched successfully',
      data: result,
    });
  }
});

const deleteExpenses = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ExpensesServices.deleteExpensesFromDB(id);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense deleted successfully',
      data: result,
    });
  }
});

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await ExpensesServices.updateExpensesIntoDb(id, payload);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Expense updated successfully',
      data: result,
    });
  }
});

export const ExpensesControllers = {
  createExpenses,
  getAllExpenses,
  getSingleExpenses,
  deleteExpenses,
  updateCourse,
};
