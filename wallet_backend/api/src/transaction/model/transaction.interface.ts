import { AccountEntry } from 'src/account/model/account.interface';
import { CategoryEntry } from 'src/category/model/category.interface';
import { User } from 'src/user/models/user.interface';

export interface TransactionEntry {
  id?: number;
  amount?: number;
  status?: number;
  type?: TransactionType;
  category?: CategoryEntry;
  account?: AccountEntry;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  SUBSCRIPTION = 'subscription',
}
