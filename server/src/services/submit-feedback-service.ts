import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedback-repositories";
import { NodemailerMailAdapter } from '../adapters/nodemailer/nodemailer-mail-adapter';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}


export class SubmitFeedbackService {
    constructor(
        private feedbacksRepository: PrismaFeedbacksRepository,
        private MailAdapter: NodemailerMailAdapter
        ) { }


    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type || !comment) {
            throw new Error('Camp is required');
        }

        await this.feedbacksRepository.create({
            type: type,
            comment: comment,
            screenshot: screenshot
        });

        await this.MailAdapter.sendMail({
            subject: 'Novo FeedBack',
            body:  [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}