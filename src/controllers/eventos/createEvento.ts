import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient()

export const createEvento: RequestHandler = async (req, res) => {
  const { data, local, name, description, horario } = req.body
  try {

    const eventoSchema = z.object({
      data: z.string(),
      local: z.string(),
      name: z.string(),
      description: z.string(),
      horario: z.string()
    })

    const body = eventoSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const eventoExist = await prisma.evento.findFirst({ where: { name } })

    if (eventoExist) {
      return res.json({ message: "Este Evento já existe" })
    }

    const evento = await prisma.evento.create({
      data: {
        data,
        local,
        name,
        description,
        horario
      }
    })

    if (!evento) {
      return res.status(400).json({ message: "Houve um problema ao cadastrar Evento" });
    }

    return res.status(201).json({ message: "Evento cadastrada com sucesso!", evento: evento })

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

