import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllPropostas: RequestHandler = async (req, res) => {
  try {
    const propostas = await prisma.campanha.findMany()

    if (propostas.length === 0) {
      return res.status(404).json({ message: "Nenhuma Proposta foi encontrada" });
    }

    return res.status(200).json(propostas);

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

