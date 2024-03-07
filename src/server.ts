import express from 'express';
import dotenv from 'dotenv'
import router from './routes/admin';
import routerClient from './routes/client';
dotenv.config();

const app = express();

app.use(express.json());

app.use(routerClient);
app.use(router);

app.listen(process.env.PORT || 3000)