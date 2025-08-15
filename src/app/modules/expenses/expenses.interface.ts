import { Types } from 'mongoose';

export type TExpense = {
  title: string;
  amount: number;
  date: string;
  category: string;
  userId: Types.ObjectId;
  isDeleted: boolean;
};
