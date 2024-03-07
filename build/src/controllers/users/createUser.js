"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const cryptedPassword = await bcrypt_1.default.hash(password, 10);
        const userSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string()
        });
        const body = userSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }
        const userExist = await prisma.user.findUnique({ where: { email } });
        if (userExist) {
            return res.json({ message: "Usuário já existe" });
        }
        const user = await prisma.user.create({
            data: {
                email,
                password: cryptedPassword
            }
        });
        if (!user) {
            return res.status(400).json({ message: "Houve um problema ao cadastrar usuario" });
        }
        return res.status(200).json({ message: "usuario cadastrado com sucesso!", usuario: user });
    }
    catch (error) {
        return res.status(500).json({ message: "Ocorreu um erro ao processar sua solicitação" });
    }
};
exports.createUser = createUser;
