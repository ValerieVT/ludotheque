CREATE TABLE IF NOT EXISTS game (
`id` INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(150) NOT NULL,
`summary` TEXT NULL,
`collaborative` BOOL NOT NULL,
`duration_min_in_minuts` SMALLINT NOT NULL,
`player_nbmin` SMALLINT NOT NULL,
`player_nbmax` SMALLINT NOT NULL,
`player_agemin` SMALLINT NOT NULL,
`player_agemax` SMALLINT NOT NULL,
`gamerule_difficulty` ENUM('1','2','3') NULL,
`generalknowledge` ENUM('1','2','3') NULL,
`chance` ENUM('1','2','3') NULL,
`reflexion` ENUM('1','2','3') NULL,
`skill` ENUM('1','2','3') NULL,
`game_id` INTEGER FOREIGN KEY NULL
)