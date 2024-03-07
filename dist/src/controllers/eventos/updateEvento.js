"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarEvento = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const editarEvento = async (req, res) => {
    const { data, local, name, description, horario } = req.body;
    const { id } = req.params;
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
        const eventoExist = await prisma.evento.findFirst({ where: { id: Number(id) } });
        if (!eventoExist) {
            return res.json({ message: "Este evento não existe" });
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
        });
        if (!evento) {
            return res.status(400).json({ message: "Houve um problema ao editar evento" });
        }
        return res.status(200).json({ message: "Evento editado com sucesso!", evento });
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.editarEvento = editarEvento;
