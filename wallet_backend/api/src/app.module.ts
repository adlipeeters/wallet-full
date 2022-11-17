import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { AccountModule } from './account/account.module';
import { MailModule } from './mail/mail.module';
import { PaymentsModule } from './payments/payments.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BlogModule,
    CategoryModule,
    TransactionModule,
    AccountModule,
    MailModule,
    PaymentsModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
