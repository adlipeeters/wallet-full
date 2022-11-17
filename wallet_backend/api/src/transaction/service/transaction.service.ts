import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { AccountService } from 'src/account/service/account.service';
import { User } from 'src/user/models/user.interface';
import { In, Repository } from 'typeorm';
import { Transaction } from '../model/transaction.entity';
import {
  TransactionEntry,
  TransactionType,
} from '../model/transaction.interface';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private accountService: AccountService,
  ) {}

  create(
    user: User,
    transaction: TransactionEntry,
  ): Observable<TransactionEntry> {
    transaction.user = user;
    if (transaction.type !== 'subscription') {
      this.accountService.updateBalance(
        Number(transaction.account),
        transaction.amount,
        transaction.type,
      );
    }
    return from(this.transactionRepository.save(transaction)).pipe(
      map((result) => {
        delete result.user;
        return result;
      }),
    );
  }

  async updateOne(
    user: User,
    id: number,
    transaction: TransactionEntry,
  ): Promise<any> {
    const currentTransaction = await this.transactionRepository.findOne({
      where: { id: id },
      relations: ['account'],
    });
    const oldAmount = currentTransaction.amount;
    transaction.user = user;
    const isBalanceUpdated = await this.accountService.updateBalanceOnEdit(
      Number(currentTransaction.account.id),
      currentTransaction,
      Number(transaction.amount),
      transaction.type,
    );

    if (isBalanceUpdated) {
      return await this.transactionRepository.update(id, transaction);
    }
  }

  findOne(id: number): Observable<TransactionEntry> {
    return from(
      this.transactionRepository.findOne({
        where: {
          id: id,
        },
      }),
    ).pipe(
      map((result) => {
        // delete result.user.role;
        // delete result.user.email;
        // delete result.user.id;
        return result;
      }),
    );
  }

  findAll(id: number): Observable<TransactionEntry[]> {
    return from(
      this.transactionRepository.find({
        relations: ['user', 'category', 'account'],
        where: {
          // modalitate multipla
          // status: In([0, 1]),
          status: 1,
          user: {
            id: id,
          },
        },
        order: {
          id: 'DESC',
        },
      }),
    ).pipe(
      map((transactions) => {
        return transactions;
      }),
    );
  }

  async deleteOne(id: number): Promise<any> {
    const currentTransaction = await this.transactionRepository.findOne({
      where: { id: id },
      relations: ['account'],
    });
    const isBalanceUpdated = await this.accountService.updateOnDelete(
      Number(currentTransaction.account.id),
      Number(currentTransaction.amount),
      currentTransaction.type,
    );
    if (isBalanceUpdated) {
      return await this.transactionRepository.update(id, { status: 0 });
    }
  }
}
