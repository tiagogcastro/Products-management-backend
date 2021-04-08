import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes/index';

import './database';

import AppError from './errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    errorName: err.name,
    errorStack: err.stack,
    status: 'error',
    message: 'Internal server error.'
  });
});

app.listen(3333, () => {
  console.log('< Server started on port 3333! >');
});
