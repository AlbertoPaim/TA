"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllCampanha_1 = require("../controllers/campanha/getAllCampanha");
const getAllEventos_1 = require("../controllers/eventos/getAllEventos");
const getAllTutorials_1 = require("../controllers/tutoriais/getAllTutorials");
const routerClient = (0, express_1.Router)();
routerClient.get('/listarPropostas', getAllCampanha_1.getAllPropostas);
routerClient.get('/listarEventos', getAllEventos_1.getAlleventos);
routerClient.get('/listarTutoriais', getAllTutorials_1.getAllTutorials);
exports.default = routerClient;
