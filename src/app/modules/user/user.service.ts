import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';

export const createUserService = async (payload: TUser) => {
  // check if user exists
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }
  // create user
  const user = await User.create(payload);
  return user;
};

export const UserServices = {
  createUserService,
};
