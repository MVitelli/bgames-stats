import { Database } from 'sqlite';
import { MatchStatDto } from '../models/boardgames.js';

export class StatsService {
  constructor(private db: Database) {}

  async create(match: MatchStatDto) {
    const { gameId, date, stats: _stats, photos: _photos } = match;
    const sql = 'INSERT INTO matches (game_id, match_date) VALUES (?, ?)';

    const result = await this.db.run(sql, [gameId, date]);
    if (result.lastID) {
      const match = await this.getById(result.lastID);
      return match!;
    } else {
      throw new Error('Failed to create match');
    }
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM matches WHERE id = ?';
    const row = await this.db.get(sql, [id]);
    return row;
  }

  async all() {
    const sql = 'SELECT * FROM matches';
    const row = await this.db.all(sql);
    return row;
  }
}
