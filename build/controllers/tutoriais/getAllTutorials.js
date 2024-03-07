"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTutorials = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTutorials = async (req, res) => {
    try {
        const tutorials = await prisma.tutoriais.findMany();
        if (tutorials.length === 0) {
            return res.status(404).json({ message: "Nenhum tutorial foi encontrado" });
        }
        return res.status(200).json(tutorials);
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.getAllTutorials = getAllTutorials;
