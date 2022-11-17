import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(token: string, name: string, email: string) {
    const user = {
      email: email,
      name: name,
      token: token,
    };
    // const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Wallet App Team" <support@wallet.com>', // override default from
      subject: 'Welcome to Wallet 1.0 App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        token: token,
        // url,
      },
    });
  }
}
