import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteProposta: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {

    const campanhaExist = await prisma.campanha.findFirst({ where: { id: Number(id) } })

    if (!campanhaExist) {
      return res.json({ message: "Esta Proposta não existe" })
    }

    const proposta = await prisma.campanha.delete({ where: { id: Number(id) } })

    if (!proposta) {
      return res.status(400).json({ message: "Houve um problema ao deletar esta proposta" });
    }

    return res.status(204).json()

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

