import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { TransactionEntry } from '../model/transaction.interface';
import { TransactionService } from '../service/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() transaction: TransactionEntry,
    @Request() req,
  ): Observable<TransactionEntry> {
    const user = req.user;
    return this.transactionService.create(user, transaction);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(
    @Param() params: TransactionEntry,
    @Body() transaction: TransactionEntry,
    @Request() req,
  ): any {
    const user = req.user;
    return this.transactionService.updateOne(
      user,
      Number(params.id),
      transaction,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params: TransactionEntry): Observable<TransactionEntry> {
    return this.transactionService.findOne(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Observable<TransactionEntry[]> {
    const user = req.user;
    return this.transactionService.findAll(Number(user.id));
  }

  @Delete(':id')
  deleteOne(@Param() params: TransactionEntry): any {
    return this.transactionService.deleteOne(Number(params.id));
  }
}
