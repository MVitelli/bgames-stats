-- TODO: use uuid instead of auto_increment

CREATE TABLE matches(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id TEXT NOT NULL,
  match_date TEXT NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE players(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alias TEXT UNIQUE,
  avatar TEXT,
  bgg_profile TEXT,
  favorite_game_id INTEGER,
  FOREIGN KEY (favorite_game_id) REFERENCES games(id)
);

CREATE TABLE matches_players(
    match_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    result TEXT CHECK( result IN ('win', 'draw', 'loss') ),
    score INTEGER,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (player_id) REFERENCES players(id)
);


CREATE TABLE games(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  weight NUMERIC,
  image TEXT
);
