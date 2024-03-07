import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient()

export const createTutorial: RequestHandler = async (req, res) => {
  const { name, video } = req.body
  try {

    const tutorialSchema = z.object({
      name: z.string(),
      video: z.string(),
    })

    const body = tutorialSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const tutorialExist = await prisma.tutoriais.findFirst({ where: { name } })

    if (tutorialExist) {
      return res.json({ message: "Este tutorial já existe" })
    }

    const tutorial = await prisma.tutoriais.create({
      data: {
        name,
        video,
      }
    })

    if (!tutorial) {
      return res.status(400).json({ message: "Houve um problema ao cadastrar o tutorial" });
    }

    return res.status(201).json({ message: "Tutorial cadastrado com sucesso!", tutorial })

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

