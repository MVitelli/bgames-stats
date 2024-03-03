export class MatchStatDto {
  gameId: string;
  date: Date;
  stats: PlayerStatDto[];
  photos: string[];
}

export class Game {
  id: string;
  name: string;
  weight: number;
  image: string;
}

export class MatchStat {
  id: number;
  game: Game;
  playersResults: PlayerStat[];
  photos: string[];
}

export class PlayerStatDto {
  playerId: string;
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
