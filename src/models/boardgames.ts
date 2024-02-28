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

export class Player {
  id: string;
  alias: string;
  avatar?: string;
  favoriteGame: Game;
}

export enum GameResult {
  WIN,
  LOSS,
}
