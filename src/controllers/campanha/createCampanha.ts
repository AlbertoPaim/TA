import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient()

export const createProposta: RequestHandler = async (req, res) => {
  const { title, description, link } = req.body
  try {

    const campanhaSchema = z.object({
      title: z.string(),
      description: z.string(),
      link: z.string()
    })

    const body = campanhaSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const campanhaExist = await prisma.campanha.findFirst({ where: { title } })

    if (campanhaExist) {
      return res.json({ message: "Esta Proposta já existe" })
    }

    const proposta = await prisma.campanha.create({
      data: {
        title,
        description,
        link
      }
    })

    if (!proposta) {
      return res.status(400).json({ message: "Houve um problema ao cadastrar proposta" });
    }

    return res.status(201).json({ message: "Proposta cadastrada com sucesso!", Proposta: proposta })

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

