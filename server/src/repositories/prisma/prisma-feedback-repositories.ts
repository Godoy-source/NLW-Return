import { prima } from "../../prisma";
import { FeedbackCreateDate, FeedbackRepository } from "../feedback-repositories";

export class PrismaFeedbacksRepository implements FeedbackRepository {
    async create({type, comment, screenshot}: FeedbackCreateDate) {
        await prima.feedback.create({
            data: {
                type: type,
                comment: comment,
                screenshot: screenshot
            }
        });
    };
}