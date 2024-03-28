import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
//TODO: Find a way to remove extensions
import { matches } from './routes/matches.js';

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/matches', matches);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
