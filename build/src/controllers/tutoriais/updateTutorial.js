"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarTutorial = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const editarTutorial = async (req, res) => {
    const { name, video } = req.body;
    const { id } = req.params;
    try {
        const tutorialSchema = zod_1.z.object({
            name: zod_1.z.string(),
            video: zod_1.z.string(),
        });
        const body = tutorialSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Dados inválidos" });
        }
        const tutorialExist = await prisma.tutoriais.findFirst({ where: { id: Number(id) } });
        if (!tutorialExist) {
            return res.json({ message: "Este tutorial não existe" });
        }
        const tutorial = await prisma.tutoriais.updateMany({
            where: { id: Number(id) },
            data: {
                name,
                video,
            }
        });
        if (!tutorial) {
            return res.status(400).json({ message: "Houve um problema ao editar o tutorial" });
        }
        return res.status(200).json({ message: "Tutorial editado com sucesso!", tutorial });
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.editarTutorial = editarTutorial;
