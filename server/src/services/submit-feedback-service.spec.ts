import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create:  createFeedbackSpy  },
    { sendMail:  sendMailSpy  }
);


describe('Submit Feedback', () => {
    it('Deveria ser possivel enviar feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple test',
            screenshot: 'test.jng'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('Nao deveria ser possivel enviar feedback sem algum dos campos: type ou comment', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemple test',
            screenshot: 'test.jng'
        })).rejects.toThrow();
    });
});