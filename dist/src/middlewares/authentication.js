"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jwtKey = process.env.jwt_key;
const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            return res.status(403).json({ message: "Acesso negado" });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token de autenticação não fornecido" });
        }
        const { userId } = jsonwebtoken_1.default.verify(token, process.env.jwt_key);
        const userExist = await prisma.user.findFirst({ where: { id: userId } });
        if (!userExist) {
            return res.status(404).json({ message: "Acesso negado" });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: "Houve um erro no servidor" });
    }
};
exports.authentication = authentication;
