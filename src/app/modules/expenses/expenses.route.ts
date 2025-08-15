import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ExpensesControllers } from './expenses.controller';
import { ExpensesValidation } from './expenses.validation';

const router = express.Router();

router.post(
  '/create-expense',
  validateRequest(ExpensesValidation.expensesValidationSchema),
  ExpensesControllers.createExpenses
);

router.get('/', ExpensesControllers.getAllExpenses);
router.get('/:id', ExpensesControllers.getSingleExpenses);
router.delete('/:id', ExpensesControllers.deleteExpenses);
router.patch(
  '/:id',
  validateRequest(ExpensesValidation.updateValidationSchema),
  ExpensesControllers.updateCourse
);

export const ExpensesRoutes = router;
