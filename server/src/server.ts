import cors from 'cors';
import express from 'express';
import { expressjwt as jwt } from "express-jwt";
import logger from 'pino-http';
import pretty from 'pino-pretty';
import { createStudent } from "./handlers/student";

import router from './router';
import {login} from "./handlers/login";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stream = pretty({
  colorize: true,
});

app.use(logger(stream));

app.post('/login/:role', login)
app.post('/signup', createStudent)

app.use('/api', router)
// TODO: UNCOMMENT THE BELOW LINE FOR PRODUCTION PURPOSE
// app.use("/api", jwt({ secret: process.env.SECRET_KEY, algorithms:["HS256"]}), router)

export default app;
