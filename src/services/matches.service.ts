import { Database } from 'sqlite';
import {
  GameResult,
  MatchStat,
  MatchStatDto,
  PlayerStatDto,
} from '../models/boardgames';

export class MatchesService {
  constructor(private db: Database) {}

  async create(match: MatchStatDto) {
    const { gameId, date, stats, photos: _photos } = match;
    const sql = 'INSERT INTO matches (game_id, match_date) VALUES (?, ?)';

    const result = await this.db.run(sql, [gameId, date]);
    if (result.lastID) {
      const match = await this.getById(result.lastID);
      await this.createStats(result.lastID, stats);
      return match!;
    } else {
      throw new Error('Failed to create match');
    }
  }

  async createStats(matchId: number, stats: PlayerStatDto[]) {
    const sql =
      'INSERT INTO matches_players (match_id, player_id, result) VALUES (?, ?, ?)';

    return Promise.all(
      stats.map(async ({ playerId, result }) => {
        await this.db.run(sql, [matchId, playerId, result]);
      }),
    );
  }

  async getStats(matchId: number) {
    const sql =
      'SELECT mp.result, mp.player_id, p.alias AS player_alias, p.avatar AS player_avatar FROM matches_players mp JOIN players p on p.id = mp.player_id WHERE match_id = ?';

    const stats = (await this.db.get(sql, [matchId])) as {
      player_id: number;
      player_alias: string;
      player_avatar: string;
      result: GameResult;
    }[];

    return stats;
  }

  async getById(id: number) {
    const sql =
      'SELECT m.match_date, g.id AS game_id, g.name AS game_name, g.image AS game_image FROM matches m JOIN games g on m.game_id = g.id WHERE id = ?';
    const { game_id, game_name, match_date, game_image } = (await this.db.get(
      sql,
      [id],
    )) as {
      game_id: number;
      game_name: string;
      match_date: string;
      game_image: string;
    };
    const playersStats = await this.getStats(id);

    return {
      id,
      date: new Date(match_date),
      game: {
        id: game_id,
        name: game_name,
        image: game_image,
      },
      playersResults: playersStats.map((s) => ({
        player: {
          id: s.player_id,
          alias: s.player_alias,
          avatar: s.player_avatar,
        },
        result: s.result,
      })),
      photos: [],
    } as MatchStat;
  }

  async all() {
    const sql = 'SELECT * FROM matches';
    const row = await this.db.all(sql);
    return row;
  }
}
