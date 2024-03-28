-- TODO: use uuid instead of auto_increment

CREATE TABLE IF NOT EXISTS matches(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id INTEGER NOT NULL,
  match_date TEXT NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS players(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alias TEXT UNIQUE,
  avatar TEXT,
  bgg_profile TEXT,
  favorite_game_id INTEGER,
  FOREIGN KEY (favorite_game_id) REFERENCES games(id)
);

CREATE TABLE IF NOT EXISTS matches_players(
    match_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    result TEXT CHECK( result IN ('win', 'draw', 'loss') ),
    score INTEGER,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (player_id) REFERENCES players(id)
);


CREATE TABLE IF NOT EXISTS games(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE,
  weight NUMERIC,
  image TEXT
);


------------------------------------------------
INSERT INTO players (alias, avatar)
VALUES 
('Dani', 'https://dani.com'),
('Maxi', 'https://maxi.com'),
('Lucas', 'https://lucas.com'),
('Milo', 'https://milo.com');

INSERT INTO games (name, weight, image)
VALUES 
('Carcassonne', 1.89, 'https://boardgamegeek.com/image/6544250/carcassonne'),
('Catan', 2.29, 'https://boardgamegeek.com/image/2419375/catan'),
('Castles of Burgundy', 2.98, 'https://boardgamegeek.com/image/1176894/the-castles-of-burgundy');


