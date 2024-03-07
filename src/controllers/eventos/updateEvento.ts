import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient()

export const editarEvento: RequestHandler = async (req, res) => {
  const { data, local, name, description, horario } = req.body
  const { id } = req.params
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

    const eventoExist = await prisma.evento.findFirst({ where: { id: Number(id) } })

    if (!eventoExist) {
      return res.json({ message: "Este evento não existe" })
    }

    const evento = await prisma.evento.updateMany({
      where: { id: Number(id) },
      data: {
        data,
        local,
        name,
        description,
        horario
      }
    })

    if (!evento) {
      return res.status(400).json({ message: "Houve um problema ao editar evento" });
    }

    return res.status(200).json({ message: "Evento editado com sucesso!", evento })

  } catch (error) {

    return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
  }
};

