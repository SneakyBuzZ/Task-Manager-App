import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

//############## APP ##################

const app: Express = express();
const PORT = process.env.PORT;

//################ UTILITIES #############

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(express.static('public'));

app.use(cookieParser());

//############## ROUTES #####################

import { taskRouter } from '../src/routes/task.route';

app.use('/taskmanager/api/v1', taskRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('WORKING');
});

app.listen(PORT, () => {
    console.log('App is listening on port: ', PORT);
});
