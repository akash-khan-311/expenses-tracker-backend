import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  profileImg: string;
  role: 'user' | 'admin' | 'superAdmin';
  status: 'active' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomByEmail(email: string): Promise<TUser | null>;
}
export type TUserRole = keyof typeof USER_ROLE;
