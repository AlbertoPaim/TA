import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteTutorial: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {

    const tutorialExist = await prisma.tutoriais.findFirst({ where: { id: Number(id) } })

    if (!tutorialExist) {
      return res.json({ message: "Este tutorial não existe" })
    }

    const tutorial = await prisma.tutoriais.delete({ where: { id: Number(id) } })

    if (!tutorial) {
      return res.status(400).json({ message: "Houve um problema ao deletar este tutorial" });
    }

    return res.status(204).json()

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

