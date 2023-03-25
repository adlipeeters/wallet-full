import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './service/mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp-relay.sendinblue.com',
          port: 587,
          secure: false,
          // ignoreTLS: true,
          auth: {
            user: 'adlipeeters@gmail.com',
            // user: config.get('EMAIL_USER'),
            pass: 'OSqPM1jJ2KEbk9VQ',
            // pass: config.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          // dir: process.cwd() + '/dist/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
