import express from 'express';
import dotenv from 'dotenv'
import router from './routes/admin';
import routerClient from './routes/client';
import cors from "cors"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routerClient);
app.use(router);

const port = process.env.PORT;

app.listen(port)