import bcrypt from 'bcrypt';
import { Document, model, Model, Schema } from 'mongoose';
import { UserStatus } from './user.constant';
import { TUser } from './user.interface';

export interface IUserDocument extends TUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
const userSchema = new Schema<IUserDocument, IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, default: 'user' },
  status: {
    type: String,
    enum: UserStatus,
    default: 'active',
  },
  profileImg: { type: String, required: false },
  isDeleted: { type: Boolean, default: false },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Static method to check if user exists
userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return this.findOne({ email }).exec();
};

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
