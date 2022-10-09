import express from "express";
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedback-repositories";
import { SubmitFeedbackService } from "./services/submit-feedback-service";


// GET = buscar infos
// PUT = Atualizar infos
// POST = cadastrar infos
// PATCH = atualizar infos de uma unica entidade
// DELETE = Deletar uma informação



export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();

    const submitFeedbackUseCase = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter); 

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    });
  
    return (res.status(201).send());
});