import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAlleventos: RequestHandler = async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany()

    if (eventos.length === 0) {
      return res.status(404).json({ message: "Nenhum evento foi encontrada" });
    }

    return res.status(200).json(eventos);

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

