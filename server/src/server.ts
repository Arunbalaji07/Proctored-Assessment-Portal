import cors from 'cors';
import express from 'express';
import { expressjwt as jwt } from "express-jwt";
import logger from 'pino-http';
import pretty from 'pino-pretty';

import router from './router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stream = pretty({
  colorize: true,
});

app.use(logger(stream));

// TEST ROUTE
app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.use('/api', router)
// TODO: UNCOMMENT THE BELOW LINE FOR PRODUCTION PURPOSE
app.use("/api", jwt({ secret: process.env.SECRET_KEY, algorithms:["HS256"]}), router)

export default app;
