import { Router } from "express";
import { createUser } from "../controllers/users/createUser";

const router = Router()

router.post('/createUser', createUser);

export default router;