"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProposta = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const createProposta = async (req, res) => {
    const { title, description, link } = req.body;
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
        const campanhaExist = await prisma.campanha.findFirst({ where: { title } });
        if (campanhaExist) {
            return res.json({ message: "Esta Proposta já existe" });
        }
        const proposta = await prisma.campanha.create({
            data: {
                title,
                description,
                link
            }
        });
        if (!proposta) {
            return res.status(400).json({ message: "Houve um problema ao cadastrar proposta" });
        }
        return res.status(201).json({ message: "Proposta cadastrada com sucesso!", Proposta: proposta });
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.createProposta = createProposta;
