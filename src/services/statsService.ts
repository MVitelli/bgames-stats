import { Database } from 'sqlite';
import { MatchStatDto } from '../models/boardgames.js';

export class StatsService {
  constructor(private db: Database) {}

  async create(match: MatchStatDto) {
    const { gameId, date, stats: _stats, photos: _photos } = match;
    const sql = 'INSERT INTO match_stats (gameId, date) VALUES (?, ?)';

    const result = await this.db.run(sql, [gameId, date]);
    if (result.lastID) {
      const createdTask = await this.getById(result.lastID);
      return createdTask!;
    } else {
      throw new Error('Failed to create task');
    }
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM match_stats WHERE id = ?';
    const row = await this.db.get(sql, [id]);
    return row;
  }
}
