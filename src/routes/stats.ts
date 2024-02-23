import { Router, Request, Response } from 'express';
import statsMock from '../models/stats.json' with { type: 'json' };

const StatsRouter = Router();

StatsRouter.get('/', (_req: Request, res: Response) => {
  res.send(statsMock);
});

StatsRouter.post('/', (_req: Request, res: Response) => {
  res.send('to add stats!!!');
});

export { StatsRouter };
