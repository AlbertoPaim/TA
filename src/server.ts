import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.send('oi')
})

app.listen(process.env.PORT || 3000)