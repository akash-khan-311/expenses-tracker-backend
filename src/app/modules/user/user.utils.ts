import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User, { IUserDocument } from './user.model';

/**
 * Verify user credentials.
 * If password is provided, it will check password match too.
 * @param email User's email
 * @param password Optional password for verification
 * @returns User document
 */
export const verifyUserCredentials = async (
  email: string,
  password?: string
): Promise<IUserDocument> => {
  // Always find by email
  const userQuery = User.findOne({ email });

  // Include password if we need to compare
  if (password) {
    userQuery.select('+password');
  }

  const user = await userQuery;

  // User not found
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email Or Password');
  }
  if (!user?.email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email Address');
  }

  // Deleted or blocked account
  if (user.isDeleted || user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'Account is not active');
  }

  // Password verification
  if (password) {
    if (!user.password) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Password not available for verification'
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Password');
    }
  }

  return user;
};
