import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { verifyUserCredentials } from '../user/user.utils';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUserIntoDb = async (payload: TLoginUser) => {
  // Checking if the user exists or not
  const user = await verifyUserCredentials(payload.email, payload.password);

  // user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Create token and sent to client

  const jwtPayload = {
    email: user.email,
    role: user.role,
    userId: user._id as unknown as string,
    profileImg: user.profileImg,
  };
  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.expires_in_access_token as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.expires_in_refresh_token as string
  );

  // Remove password before sending
  const { password, ...userData } = user.toObject();

  return {
    user: userData,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  // verify token
  const decoded = jwt.verify(
    token,
    config.refresh_token_secret as string
  ) as JwtPayload;

  const { userId } = decoded;

  const user = await verifyUserCredentials(userId);
  const jwtPayload = {
    userId: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.expires_in_access_token as string
  );
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserIntoDb,
  refreshToken,
};
