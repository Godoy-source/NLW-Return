export interface FeedbackCreateDate {
    type: string;
    comment: string;
    screenshot?: string;
}



export interface FeedbackRepository {
    create: (data: FeedbackCreateDate) => Promise<void>;
}