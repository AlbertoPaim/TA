import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient()

export const editarProposta: RequestHandler = async (req, res) => {
  const { title, description, link } = req.body
  const { id } = req.params
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

    const campanhaExist = await prisma.campanha.findFirst({ where: { id: Number(id) } })

    if (!campanhaExist) {
      return res.json({ message: "Esta Proposta não existe" })
    }

    const proposta = await prisma.campanha.updateMany({
      where: { id: Number(id) },
      data: {
        title,
        description,
        link
      }
    })

    if (!proposta) {
      return res.status(400).json({ message: "Houve um problema ao editar proposta" });
    }

    return res.status(200).json({ message: "Proposta editada com sucesso!", PropostaEditada: proposta })

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

