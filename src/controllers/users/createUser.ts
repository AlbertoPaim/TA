import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export const createUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body
  try {
    const cryptedPassword = await bcrypt.hash(password, 10);

    const userSchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const body = userSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ message: "Email ou senha inválidos" });
    }

    const userExist = await prisma.user.findUnique({ where: { email } })

    if (userExist) {
      return res.json({ message: "Usuário já existe" })
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: cryptedPassword
      }
    })

    if (!user) {
      return res.status(400).json({ message: "Houve um problema ao cadastrar usuario" });
    }

    return res.status(200).json({ message: "usuario cadastrado com sucesso!", usuario: user })

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

