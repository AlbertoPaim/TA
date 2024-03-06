import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    if (users.length === 0) {
      return res.status(404).json({ message: "Nenhum usuário foi encontrado" })
    }

    return res.status(200).json(users)

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

