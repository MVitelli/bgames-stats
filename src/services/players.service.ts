import { Database } from 'sqlite';
import { Player, PlayerDto } from 'src/models/boardgames';

export class PlayersService {
  constructor(private db: Database) {}

  async create(player: PlayerDto) {
    const { alias, avatar, favoriteGameId } = player;
    const sql =
      'INSERT INTO players (alias, avatar, favorite_game_id) VALUES (?, ?, ?)';

    const result = await this.db.run(sql, [alias, avatar, favoriteGameId]);
    if (result.lastID) {
      const player = await this.getById(result.lastID);
      return player!;
    } else {
      throw new Error('Failed to create player');
    }
  }

  async getById(id: number) {
    const sql = 'SELECT * FROM players WHERE id = ?';
    const row = await this.db.get(sql, [id]);
    return row as Player;
  }
}
