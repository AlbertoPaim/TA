import { Router } from "express";
import { createUser } from "../controllers/users/createUser";
import { login } from "../controllers/users/login";
import { authentication } from "../middlewares/authentication";
import { getUsers } from "../controllers/users/getUsers";

const router = Router()


router.post('/createUser', createUser);
router.post('/login', login);

router.use(authentication)

router.use('/getUsers', getUsers)
export default router;