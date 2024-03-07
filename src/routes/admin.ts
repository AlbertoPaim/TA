import { Router } from "express";
import { createUser } from "../controllers/users/createUser";
import { login } from "../controllers/users/login";
import { authentication } from "../middlewares/authentication";
import { getUsers } from "../controllers/users/getUsers";

import { createProposta } from "../controllers/campanha/createCampanha";
import { editarProposta } from "../controllers/campanha/updateCampanha";
import { deleteProposta } from "../controllers/campanha/deleteCampanha";

import { createEvento } from "../controllers/eventos/createEvento";
import { editarEvento } from "../controllers/eventos/updateEvento";
import { deleteEvento } from "../controllers/eventos/deleteEventos";

const router = Router()


router.post('/createUser', createUser);
router.post('/login', login);

router.use(authentication)

router.use('/getUsers', getUsers)

router.post('/criarProposta', createProposta);
router.put('/editarProposta/:id', editarProposta);
router.delete('/deletarProposta/:id', deleteProposta);

router.post('/criarEvento', createEvento);
router.put('/editarEvento/:id', editarEvento);
router.delete('/deletarEvento/:id', deleteEvento)

router.post('/criarTutorial');
router.put('/editarTutorial/:id');
router.delete('/deletarTutorial/:id');

export default router;