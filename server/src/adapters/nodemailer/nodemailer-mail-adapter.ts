import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0e8b5b62c565a4",
        pass: "36ca7dbd69eed4"
    }
});

export class NodemailerMailAdapter implements MailAdapter {

    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <desenvolvimento@feedget.com>',
            to: 'Gabriel Inácio <gamesgodoy@gmail.com>',
            subject,
            html: body
        });
    }
}