CREATE TABLE IF NOT EXISTS game (
`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(150) NOT NULL,
`summary` TEXT NULL,
`duration_min_in_minuts` SMALLINT NOT NULL,
`player_nbmin` SMALLINT NOT NULL,
`player_nbmax` SMALLINT NOT NULL,
`player_agemin` SMALLINT NULL,
`player_agemax` SMALLINT NULL,
`collaborative` BOOL NOT NULL,
`asymetric` BOOL NOT NULL,
`gamerule_difficulty` ENUM('1','2','3') NULL,
`generalknowledge` ENUM('0','1','2','3') NULL,
`chance` ENUM('0','1','2','3') NULL,
`reflection` ENUM('0','1','2','3') NULL,
`skill` ENUM('0','1','2','3') NULL,
`game_id` INTEGER NULL,
CONSTRAINT fk_game_game
FOREIGN KEY (game_id)
REFERENCES game(id)
);
CREATE TABLE IF NOT EXISTS picture (
`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
`image` TEXT NOT NULL,
`type` ENUM('int','ext') NULL,
`game_id` INT NOT NULL,
CONSTRAINT fk_game_picture
FOREIGN KEY (game_id)
REFERENCES game(id)
);
CREATE TABLE IF NOT EXISTS theme (
`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS game_theme (
`game_id` INTEGER NOT NULL,
`theme_id` INTEGER NOT NULL,
PRIMARY KEY (game_id, theme_id),
CONSTRAINT fk_game_game_theme
FOREIGN KEY (game_id)
REFERENCES game(id),
CONSTRAINT fk_theme_game_theme
FOREIGN KEY (theme_id)
REFERENCES theme(id)
);
CREATE TABLE IF NOT EXISTS admin (
`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
`identifier` VARCHAR(30) UNIQUE NOT NULL,
`password` VARCHAR(60) NOT NULL
);