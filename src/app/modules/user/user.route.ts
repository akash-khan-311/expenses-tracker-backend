import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-user',

  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);
export const UserRoutes = router;
