import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import z from "zod"

const prisma = new PrismaClient()
const jwtKey = process.env.jwt_key

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const body = userSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const userExist = await prisma.user.findFirst({ where: { email } })

    if (!userExist) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const verifyPassword = await bcrypt.compare(password, userExist.password)

    if (!verifyPassword) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ userId: userExist.id }, jwtKey, { expiresIn: "4h" })

    return res.status(200).json({ token });

  } catch (error) {
    return res.status(500).json({ message: "Houve um erro no servidor" });
  }
}