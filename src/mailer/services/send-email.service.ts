import { Injectable } from '@nestjs/common';
import { AbstractService, NestLoggerService } from '../../common';

import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendEmailService extends AbstractService<boolean> {
  constructor(private readonly logger: NestLoggerService) {
    super(logger);
  }

  private applyArgs(template: string, args: Record<string, any>) {
    return Object.keys(args).reduce((acc, key) => {
      return acc.split(`$${key}`).join(args[key]);
    }, template);
  }

  async execute(
    to: string,
    subject: string,
    template: string,
    args: Record<string, any>,
    correlationId: string,
  ) {
    this.logBefore({
      to,
      subject,
      template,
      args,
      correlationId,
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const response = await sgMail.send({
      to,
      from: 'entregas.system.app@gmail.com',
      subject: subject,
      html: this.applyArgs(template, args),
    });

    this.logAfter({
      response,
      correlationId,
    });

    return true;
  }
}
