import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ExpensesRoutes } from '../modules/expenses/expenses.route';
import { UserRoutes } from '../modules/user/user.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/expenses',
    route: ExpensesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
