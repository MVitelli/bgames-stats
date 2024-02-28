import { Router, Request, Response } from 'express';
import statsMock from '../models/stats.json' with { type: 'json' };
import { StatsService } from '../services/statsService';

const StatsRouter = Router();
const db = await initDb();

const stats = new StatsService(db);

StatsRouter.get('/', (_req: Request, res: Response) => {
  res.send(statsMock);
});

StatsRouter.post('/', (req: Request, res: Response) => {
  const { body } = req;

  res.send('Stats added');
});

export { StatsRouter };
