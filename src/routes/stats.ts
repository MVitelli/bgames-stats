import { Router, Request, Response } from 'express';
import statsMock from '../models/stats.json' with { type: 'json' };
import { initDb } from '../database/db.js';
import { StatsService } from '../services/statsService.js';

const statsRouter = Router();
const db = await initDb();

const statsService = new StatsService(db);

statsRouter.get('/', (_req: Request, res: Response) => {
  res.send(statsMock);
});

statsRouter.post('/', async (req: Request, res: Response) => {
  await statsService.create(req.body);

  res.send('Stats added');
});

export { statsRouter };
