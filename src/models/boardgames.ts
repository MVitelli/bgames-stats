export class MatchStatDto {
  gameId: number;
  date: Date;
  stats: PlayerStatDto[];
  photos: string[];
}

export class Game {
  id: number;
  name: string;
  weight?: number;
  image: string;
}

export class MatchStat {
  id: number;
  date: Date;
  game: Game;
  playersResults: PlayerStat[];
  photos: string[];
}

export class PlayerStatDto {
  playerId: number;
  result: GameResult;
}

export class PlayerStat {
  player: Player;
  result: GameResult;
}

export class PlayerDto {
  alias: string;
  avatar?: string;
  favoriteGameId?: string;
}

export class Player {
  id: number;
  alias: string;
  avatar?: string;
  favoriteGame?: Game;
}

export class GameResultDetails {
  result: GameResult;
  score?: number;
}

export enum GameResult {
  WIN,
  LOSS,
}
