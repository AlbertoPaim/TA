import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const jwtKey = process.env.jwt_key;

type JwtId = {
  userId: number
}

export const authentication: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers

  try {
    if (!authorization) {
      return res.status(403).json({ message: "Acesso negado" })
    }
    const token = authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Token de autenticação não fornecido" });
    }

    const { userId } = jwt.verify(token, process.env.jwt_key) as JwtId

    const userExist = await prisma.user.findFirst({ where: { id: userId } })

    if (!userExist) {
      return res.status(404).json({ message: "Acesso negado" });
    }

    next()

  } catch (error) {
    return res.status(500).json({ message: "Houve um erro no servidor" });
  }

}