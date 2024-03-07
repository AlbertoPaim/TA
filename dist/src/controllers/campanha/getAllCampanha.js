"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPropostas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllPropostas = async (req, res) => {
    try {
        const propostas = await prisma.campanha.findMany();
        if (propostas.length === 0) {
            return res.status(404).json({ message: "Nenhuma Proposta foi encontrada" });
        }
        return res.status(200).json(propostas);
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.getAllPropostas = getAllPropostas;
