import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { StatsRouter } from './routes/stats.js';

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/stats', StatsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});