import { Router, Request, Response } from 'express';
import { initDb } from '../database/db.js';
import { MatchesService } from '../services/matches.service.js';
// import statsMock from '../models/stats.json' with { type: 'json' };

const matches: Router = Router();
const db = await initDb();

const matchesService = new MatchesService(db);

matches.get('/', async (_req: Request, res: Response) => {
  const stats = await matchesService.all();

  res.send(stats);
});

matches.post('/', async (req: Request, res: Response) => {
  await matchesService.create(req.body);

  res.send('Stats added');
});

export { matches };
