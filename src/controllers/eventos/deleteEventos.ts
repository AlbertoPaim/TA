import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteEvento: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {

    const eventoExist = await prisma.evento.findFirst({ where: { id: Number(id) } })

    if (!eventoExist) {
      return res.json({ message: "Este evento não existe" })
    }

    const evento = await prisma.evento.delete({ where: { id: Number(id) } })

    if (!evento) {
      return res.status(400).json({ message: "Houve um problema ao deletar este evento" });
    }

    return res.status(204).json()

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

