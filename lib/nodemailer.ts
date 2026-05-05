import nodemailer from 'nodemailer';
import { config } from '@/config';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
});

export const createMailOptions = (to: string, code: string): MailOptions => ({
  from: `Flow App <${config.MAIL_USER}>`,
  to,
  subject: 'Email Verification',
  html: `<b>Code: ${code}</b>`,
});
