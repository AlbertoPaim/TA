import { Router } from "express";
import { getAllPropostas } from "../controllers/campanha/getAllCampanha";
import { getAlleventos } from "../controllers/eventos/getAllEventos";
import { getAllTutorials } from "../controllers/tutoriais/getAllTutorials";

const routerClient = Router()

routerClient.get('/listarPropostas', getAllPropostas);

routerClient.get('/listarEventos', getAlleventos);

routerClient.get('/listarTutoriais', getAllTutorials);

export default routerClient;