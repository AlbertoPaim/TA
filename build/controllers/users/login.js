"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const prisma = new client_1.PrismaClient();
const jwtKey = process.env.jwt_key;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userSchema = zod_1.default.object({
            email: zod_1.default.string().email(),
            password: zod_1.default.string()
        });
        const body = userSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }
        const userExist = await prisma.user.findFirst({ where: { email } });
        if (!userExist) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        const verifyPassword = await bcrypt_1.default.compare(password, userExist.password);
        if (!verifyPassword) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: userExist.id }, jwtKey, { expiresIn: "4h" });
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: "Houve um erro no servidor" });
    }
};
exports.login = login;
