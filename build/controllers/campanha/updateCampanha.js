"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarProposta = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const editarProposta = async (req, res) => {
    const { title, description, link } = req.body;
    const { id } = req.params;
    try {
        const campanhaSchema = zod_1.z.object({
            title: zod_1.z.string(),
            description: zod_1.z.string(),
            link: zod_1.z.string()
        });
        const body = campanhaSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Dados inválidos" });
        }
        const campanhaExist = await prisma.campanha.findFirst({ where: { id: Number(id) } });
        if (!campanhaExist) {
            return res.json({ message: "Esta Proposta não existe" });
        }
        const proposta = await prisma.campanha.updateMany({
            where: { id: Number(id) },
            data: {
                title,
                description,
                link
            }
        });
        if (!proposta) {
            return res.status(400).json({ message: "Houve um problema ao editar proposta" });
        }
        return res.status(200).json({ message: "Proposta editada com sucesso!", PropostaEditada: proposta });
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.editarProposta = editarProposta;
