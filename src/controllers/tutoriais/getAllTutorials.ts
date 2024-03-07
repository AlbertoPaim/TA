import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllTutorials: RequestHandler = async (req, res) => {
  try {
    const tutorials = await prisma.tutoriais.findMany()

    if (tutorials.length === 0) {
      return res.status(404).json({ message: "Nenhum tutorial foi encontrado" });
    }

    return res.status(200).json(tutorials);

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

