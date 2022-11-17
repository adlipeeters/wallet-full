import { AccountEntity } from 'src/account/model/account.entity';
import { Category } from 'src/category/model/category.entity';
import { UserEntity } from 'src/user/models/user.entity';

import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionType } from './transaction.interface';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ default: 1 })
  status: number;

  @ManyToOne(() => Category, (category) => category.transactions)
  category: Category;

  @ManyToOne(() => UserEntity, (user) => user.transactions)
  user: UserEntity;

  @ManyToOne((type) => AccountEntity, (account) => account.transactions)
  account: AccountEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
