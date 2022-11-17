import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './service/mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          ignoreTLS: false,
          auth: {
            // user: 'usatii.andrei062000@gmail.com',
            user: config.get('EMAIL_USER'),
            // pass: 'zplxmspnmhjeaazh',
            pass: config.get('EMAIL_PASSWORD'),
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
