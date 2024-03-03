import { Router, Request, Response } from 'express';
import { initDb } from '../database/db.js';
import { StatsService } from '../services/stats.service.js';
// import statsMock from '../models/stats.json' with { type: 'json' };

const statsRouter = Router();
const db = await initDb();

const statsService = new StatsService(db);

statsRouter.get('/', async (_req: Request, res: Response) => {
  const stats = await statsService.all();

  res.send(stats);
});

statsRouter.post('/', async (req: Request, res: Response) => {
  await statsService.create(req.body);

  res.send('Stats added');
});

export { statsRouter };
