import { Router } from "express";
import { getAllPropostas } from "../controllers/campanha/getAllCampanha";
import { getAlleventos } from "../controllers/eventos/getAllEventos";

const routerClient = Router()

routerClient.get('/listarPropostas', getAllPropostas);

routerClient.get('/listarEventos', getAlleventos);


export default routerClient;