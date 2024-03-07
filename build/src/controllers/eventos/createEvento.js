"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvento = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const createEvento = async (req, res) => {
    const { data, local, name, description, horario } = req.body;
    try {
        const eventoSchema = zod_1.z.object({
            data: zod_1.z.string(),
            local: zod_1.z.string(),
            name: zod_1.z.string(),
            description: zod_1.z.string(),
            horario: zod_1.z.string()
        });
        const body = eventoSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Dados inválidos" });
        }
        const eventoExist = await prisma.evento.findFirst({ where: { name } });
        if (eventoExist) {
            return res.json({ message: "Este Evento já existe" });
        }
        const evento = await prisma.evento.create({
            data: {
                data,
                local,
                name,
                description,
                horario
            }
        });
        if (!evento) {
            return res.status(400).json({ message: "Houve um problema ao cadastrar Evento" });
        }
        return res.status(201).json({ message: "Evento cadastrada com sucesso!", evento: evento });
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.createEvento = createEvento;
