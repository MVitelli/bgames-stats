import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { matches } from './routes/matches.js';
import { photos } from './routes/photos.js';

// TODO: handle async errors
// TODO: use knex

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/matches', matches);
app.use('/api/photos', photos);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
