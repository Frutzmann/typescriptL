import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import router from './routes/todos';

const app = express();

app.use(json());

app.use('/todos', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {});

app.listen(8080);