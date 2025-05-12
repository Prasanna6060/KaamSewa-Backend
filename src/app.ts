import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from './middlewares/errorHandler'; 
import authRouter from './routes/auth.route'
import mongoose from 'mongoose';

const app = express();




app.use(express.json());
app.use('/api/auth', authRouter);



app.get('/health', (req: Request, res: Response) => {
  res.send('OK');
});



app.use(errorHandler);  

export default app;
