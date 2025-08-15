import { Types } from 'mongoose';

export type TExpense = {
  title: string;
  amount: string;
  date: string;
  category: string;
  userId: Types.ObjectId;
  isDeleted: boolean;
};
