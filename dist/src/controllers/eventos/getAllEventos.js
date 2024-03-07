"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlleventos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAlleventos = async (req, res) => {
    try {
        const eventos = await prisma.evento.findMany();
        if (eventos.length === 0) {
            return res.status(404).json({ message: "Nenhum evento foi encontrada" });
        }
        return res.status(200).json(eventos);
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.getAlleventos = getAlleventos;
