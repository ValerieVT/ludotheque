-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.22 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour ludotheque
CREATE DATABASE IF NOT EXISTS `ludotheque` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ludotheque`;

-- Listage de la structure de la table ludotheque. admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier` (`identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table ludotheque.admin : ~2 rows (environ)
DELETE FROM `admin`;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `identifier`, `password`) VALUES
	(1, 'Valérie', '$2a$12$.oiUC0ajrOPRSPvvo9yNZO.3LLN6NLgIa3mTBJTF5w65rLUNdLS9C'),
	(2, 'test', '$2a$12$3FfmRxXM65i/wZjgyol8UOa1owZ1ATNcM7e9f3G6fpqE311J3euFa');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Listage de la structure de la table ludotheque. game
CREATE TABLE IF NOT EXISTS `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `duration_min_in_minuts` smallint NOT NULL,
  `player_nbmin` smallint NOT NULL,
  `player_nbmax` smallint NOT NULL,
  `player_agemin` smallint DEFAULT NULL,
  `player_agemax` smallint DEFAULT NULL,
  `collaborative` tinyint(1) NOT NULL,
  `asymetric` tinyint(1) NOT NULL,
  `gamerule_difficulty` enum('1','2','3') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `generalknowledge` enum('0','1','2','3') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chance` enum('0','1','2','3') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reflection` enum('0','1','2','3') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `skill` enum('0','1','2','3') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `game_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_game` (`game_id`),
  CONSTRAINT `fk_game_game` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table ludotheque.game : ~78 rows (environ)
DELETE FROM `game`;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` (`id`, `name`, `summary`, `duration_min_in_minuts`, `player_nbmin`, `player_nbmax`, `player_agemin`, `player_agemax`, `collaborative`, `asymetric`, `gamerule_difficulty`, `generalknowledge`, `chance`, `reflection`, `skill`, `game_id`) VALUES
	(1, '18 soldats du feu', 'Plongez au coeur d’un bâtiment en feu pour en sauver les victimes… mais attention aux explosions surprises !', 45, 2, 6, NULL, NULL, 1, 0, '2', '0', '2', '2', '0', NULL),
	(2, '51ème Etat', 'Après la crise, fondez votre propre état... un peu déjanté !', 60, 2, 4, NULL, NULL, 0, 0, '3', '0', '1', '3', '0', NULL),
	(3, '6 qui prend', 'Jeu de cartes, il faut défausser toutes ses cartes.', 45, 2, 10, NULL, NULL, 0, 0, '1', '0', '2', '2', '0', NULL),
	(4, 'Agricola', 'La vie d\'une famille de paysans : culture de champs, animaux de ferme... beau matériel.', 120, 1, 5, NULL, NULL, 0, 0, '3', '0', '1', '3', '0', NULL),
	(5, 'Bamboleo', 'Il faut ôter des pièces sans faire tomber le plateau.', 15, 2, 7, NULL, NULL, 0, 0, '1', '0', '1', '1', '3', NULL),
	(6, 'Bandido', 'Un jeu labyrinthique ! Aidez un bandit qui tente de s\'échapper en creusant des tunnels.', 5, 1, 4, NULL, NULL, 1, 0, '1', '0', '1', '1', '0', NULL),
	(7, 'BIG Idea', 'Jeu de parlotte : vous devez vendre votre super invention !', 25, 3, 6, NULL, NULL, 0, 0, '1', '2', '1', '1', '0', NULL),
	(8, 'Brin de jasette', 'Parlons d\'insolite...', 30, 3, 8, NULL, NULL, 0, 0, '1', '3', '2', '0', '0', NULL),
	(9, 'Bugs', 'Découvrez les bases de la programmation informatique tout en coopérant.', 25, 1, 4, NULL, NULL, 1, 0, '1', '0', '2', '2', '0', NULL),
	(10, 'Camelot', 'Combat de chevaliers... avec des cartes.', 30, 2, 5, NULL, NULL, 0, 0, '2', '0', '3', '2', NULL, NULL),
	(11, 'Carcassone La Cité', 'Construisons la cité de Carcassonne, avec ses murailles et ses ruelles.', 30, 2, 4, NULL, NULL, 0, 0, '2', '0', '1', '3', NULL, NULL),
	(12, 'Carcassone à la préhistoire', 'La vie à la préhistoire : se faire des territoires de chasse, trouver des coins de pêche...', 45, 2, 5, NULL, NULL, 0, 0, '1', '0', '2', '2', '0', NULL),
	(13, 'Chasse gardée', 'Chasseur et bûcheron contre animaux de la forêt.', 40, 2, 2, NULL, NULL, 0, 1, '2', '0', '2', '2', NULL, NULL),
	(14, 'Colons de Cathane', 'La construction d\'un village et son développement... avec des cartes.', 75, 2, 2, NULL, NULL, 0, 0, '3', '0', '1', '3', '0', NULL),
	(15, 'Convoi', 'Une histoire de train.', 30, 2, 2, NULL, NULL, 0, 0, '2', '0', NULL, NULL, NULL, NULL),
	(16, 'Dead of winter', 'Un monde de zombies !', 60, 2, 5, NULL, NULL, 1, 0, '3', '0', NULL, NULL, '0', NULL),
	(17, 'Death Angel', 'Les marines débarquent dans un vaisseau d\'aliens... et c\'est le combat de cartes.', 30, 1, 6, NULL, NULL, 0, 0, '2', NULL, '3', '1', NULL, NULL),
	(18, 'Deep sea Adventure', 'Jeu de scaphandrier, l\'air se raréfie...', 30, 2, 6, NULL, NULL, 0, 0, '1', '0', NULL, '2', '0', NULL),
	(19, 'Diaballik', 'Jeu d\'échecs avec des boules et des assiettes.', 20, 2, 2, NULL, NULL, 0, 0, '1', '0', '0', '3', '0', NULL),
	(20, 'Dixit', 'Faire deviner la carte à laquelle on pense avec une simple expression. Attention, si tout le monde trouve, c’est perdu !', 30, 3, 12, NULL, NULL, 0, 0, '1', '3', '0', '0', '0', NULL),
	(21, 'Dongeon twister', 'Duel dans un donjon + extensions', 45, 2, 2, NULL, NULL, 0, 0, '3', '0', NULL, '3', '0', NULL),
	(22, 'Dungeon lords', 'Le même principe que Dungeon Keeper Gold… Tu vois, petit, les méchants aussi peuvent gagner !', 90, 2, 4, NULL, NULL, 0, 0, '3', '0', '2', '3', '0', NULL),
	(23, 'Eminent Domain', 'Coloniser la galaxie avec des cartes.', 45, 2, 4, NULL, NULL, 0, 0, '1', NULL, NULL, '3', NULL, NULL),
	(24, 'Forêt', 'Construire sa forêt et gérer les animaux qui y vivent (pas trop, juste assez)', 15, 2, 4, NULL, NULL, 0, 0, '2', '0', '1', '3', '0', NULL),
	(25, 'Fresco', 'Accomplissez les tâches d\'un peintre artistique... jeu de stratégie.', 60, 2, 4, NULL, NULL, 0, 0, '3', NULL, NULL, '3', '0', NULL),
	(26, 'Guerre et Bêêêh', 'Trouvez la plus belle herbe pour votre troupeau... mais attention au loup !', 15, 2, 2, NULL, NULL, 0, 0, '2', '0', '1', '3', '0', NULL),
	(27, 'Hanabi', 'Feux d\'artifice avec des cartes.', 30, 2, 5, NULL, NULL, 0, 0, '1', '0', '2', '2', '0', NULL),
	(28, 'Il était une fois', 'Raconter des histoires !', 30, 2, 6, NULL, NULL, 0, 0, '1', '1', '1', '3', '0', NULL),
	(29, 'Imagine', 'Faire deviner un mot avec des cartes symboles', 30, 3, 8, NULL, NULL, 0, 0, '1', '3', NULL, '3', NULL, NULL),
	(30, 'Kharnage', 'Essayer d\'être le premier à la table de pique-nique (jeu de guerre par cartes)', 15, 2, 4, 6, NULL, 0, 0, '1', '0', '1', '2', '0', NULL),
	(31, 'King assassins', 'Roi contre assassins (jeu asymétrique).', 20, 2, 2, NULL, NULL, 0, 0, '1', '0', NULL, '3', '0', NULL),
	(32, 'L\'Empereur', 'On joue des manchots', 15, 2, 4, NULL, NULL, 0, 0, '2', '0', NULL, '2', '0', NULL),
	(33, 'La glace et le ciel', 'Coopératif', 15, 2, 4, NULL, NULL, 1, 0, '2', '0', NULL, '3', '0', NULL),
	(34, 'Le désert interdit', 'Jeu coopératif contre la soif et la tempête de sable...', 45, 2, 5, NULL, NULL, 1, 0, '2', NULL, '1', '2', NULL, NULL),
	(35, 'Les aventuriers du rail', 'Jeu de mémoire.', 30, 2, 4, NULL, NULL, 0, 0, '2', '0', NULL, '3', '0', NULL),
	(36, 'Les loups-garous de Thiercelieux', 'Loups-garous contre villageois... mais qui est qui ?', 30, 8, 18, NULL, NULL, 0, 0, '1', NULL, NULL, '3', NULL, NULL),
	(37, 'Louny Quest', 'Saurez-vous faire courir votre feutre entre les obstacles invisibles ?', 20, 2, 5, NULL, NULL, 0, 0, '1', '0', '0', '1', '3', NULL),
	(38, 'Mainframe', 'Exécutez des Programmes, placez des Points d’accès et des Barrières, et prenez le contrôle du Serveur Central !', 30, 2, 4, NULL, NULL, 0, 0, '1', NULL, NULL, '3', NULL, NULL),
	(39, 'mars', 'Construisons des colonies sur Mars.', 90, 2, 4, NULL, NULL, 0, 0, '2', '0', '1', '3', '0', NULL),
	(40, 'Mémoire 44', 'Reconstitution de batailles réelles... mais qui aura le dessus ?', 60, 1, 9, NULL, NULL, 0, 1, '2', '0', '0', '3', '0', NULL),
	(41, 'Micro-mutants', 'Jeu de puces avec des insectes extra-terrestres qui ont des pouvoirs.', 30, 2, 2, 4, NULL, 0, 0, '1', NULL, NULL, '1', '3', NULL),
	(42, 'Migrato', 'Faites migrer plus d\'oiseaux que votre adversaire.', 15, 2, 2, NULL, NULL, 0, 0, '1', '0', '1', '2', '0', NULL),
	(43, 'Ninja', 'D\'un côté le terroriste, de l\'autre les gardiens d\'une maison bourgeoise.', 45, 2, 4, NULL, NULL, 0, 0, '2', '0', '1', '3', '0', NULL),
	(44, 'Not alone', 'S\'évader de la planète avant que celle-ci ne nous absorbe...', 30, 2, 7, NULL, NULL, 0, 0, '2', NULL, '3', '3', NULL, NULL),
	(45, 'Off the dead', 'Jeu coopératif : combat de zombies', 60, 1, 4, NULL, NULL, 1, 0, '2', NULL, '3', '3', '0', NULL),
	(46, 'Paf le singe', 'Un singe s\'est réfugié sur les hauteurs d\'une décharge. Il faut être le 1er à l\'atteindre.', 30, 2, 6, NULL, NULL, 0, 0, '1', NULL, '3', '1', NULL, NULL),
	(47, 'Pandémie', 'Jeu coopératif : enrayer 4 épidémies de la planète.', 45, 2, 4, 7, NULL, 1, 0, '2', '0', '2', '3', NULL, NULL),
	(48, 'Pitch car', 'Jeu de pichenettes.', 30, 2, 8, NULL, NULL, 0, 0, '1', NULL, '1', NULL, '3', NULL),
	(49, 'Polarity', 'Un jeu d\'aimants.', 15, 2, 4, NULL, NULL, 0, 0, '1', '0', '1', '0', '3', NULL),
	(50, 'Pollen', 'Un champ de fleurs. 2 ruches. Elaborez la meilleure stratégie !', 15, 2, 2, NULL, NULL, 0, 0, '2', '0', NULL, '3', '0', NULL),
	(51, 'Quirkle', 'Jeu de logique avec des symboles et des couleurs.', 30, 2, 4, NULL, NULL, 0, 0, '1', NULL, '1', '3', '0', NULL),
	(52, 'Race for the Galaxy', 'Coloniser la galaxie avec des cartes.', 40, 2, 4, NULL, NULL, 0, 0, '3', NULL, NULL, '3', NULL, NULL),
	(53, 'Rattus', 'La peste envahit l\'Europe !', 45, 2, 4, NULL, NULL, 0, 0, '1', '0', '2', '3', NULL, NULL),
	(54, 'Richesses de France', 'Parcourir les régions de France en validant des étapes (plusieurs circuits)', 60, 2, 4, NULL, NULL, 0, 0, '1', NULL, '3', '1', '0', NULL),
	(55, 'Roll through the ages', 'Jeu compact où il faut développer la meilleure cité.', 45, 1, 4, 7, NULL, 0, 0, '1', '0', '2', '3', '0', NULL),
	(56, 'Sans foi ni loi', 'Serez-vous le plus prospère des cow-boys ?', 60, 2, 6, NULL, NULL, 0, 0, '2', NULL, '3', '2', '0', NULL),
	(57, 'Scrabble', 'Trouver les mots qui rapportent le plus de points.', 60, 2, 6, 8, NULL, 0, 0, '1', '3', '1', '3', '0', NULL),
	(58, 'Sherlock Holmes détective conseil', 'Coopératif', 60, 1, 8, NULL, NULL, 1, 0, '3', NULL, NULL, '3', NULL, NULL),
	(59, 'SIAM', 'Un genre d\'échecs plus facile', 15, 2, 2, NULL, NULL, 0, 0, '1', '0', '0', '3', '0', NULL),
	(60, 'Siggil', 'Coopératif – récupérer toutes ses cartes sur le plateau', 20, 1, 4, NULL, NULL, 1, 0, '1', NULL, NULL, '3', '0', NULL),
	(61, 'Snow tails', 'Course de traîneaux.', 45, 2, 5, NULL, NULL, 0, 0, '2', NULL, '3', '2', NULL, NULL),
	(62, 'Stronghold', 'D\'un côté l\'assaillant, de l\'autre le défenseur du château.', 120, 2, 4, NULL, NULL, 0, 1, '3', '0', '0', '3', '0', NULL),
	(63, 'Sutakku', 'Jeu de dé « stop ou encore ».', 15, 1, 18, NULL, NULL, 0, 0, '1', '0', '3', NULL, '0', NULL),
	(64, 'The game', 'Coopératif – se débarrasser de toutes ses cartes', 20, 1, 5, NULL, NULL, 1, 0, '1', NULL, NULL, '3', '0', NULL),
	(65, 'The pyramid\'s deazdline', 'Construire une pyramide', 20, 2, 6, NULL, NULL, 0, 0, '1', NULL, '1', '1', '0', NULL),
	(66, 'Time stories', 'Voyagez à travers le temps et les réalités multiples.', 90, 2, 4, NULL, NULL, 0, 0, '3', NULL, NULL, '3', '0', NULL),
	(67, 'Tsuro', 'Le principe : construire un chemin qui nous évite de sortir du plateau.', 10, 2, 8, NULL, NULL, 0, 0, '1', '0', '1', '3', '0', NULL),
	(68, 'Tumbling dice', 'La pétanque... avec des dés et des pichenettes !!!', 15, 2, 6, NULL, NULL, 0, 0, '1', '0', '2', '0', '3', NULL),
	(69, 'Une vie de chien', 'On est des chiens : marquer des pipis, trouver des nonos... se faire choper par la fourrière.', 90, 2, 6, NULL, NULL, 0, 0, '2', '0', '3', '2', '0', NULL),
	(70, 'vendredi', 'Survivre sur son île déserte... avec des cartes.', 25, 1, 1, NULL, NULL, 0, 0, '2', '0', '2', '3', '0', NULL),
	(71, 'Wasabi', 'Jeu de dés (?)', 20, 2, 6, NULL, NULL, 0, 0, '1', NULL, NULL, NULL, NULL, NULL),
	(72, 'Zombies!!!', 'Inspiré du film : attaquer les zombies dans la ville et atteindre l\'hélicoptère.', 60, 2, 6, 10, NULL, 0, 0, '2', '0', '3', '2', '0', NULL),
	(73, 'Couadsous', 'Un jeu à s’en retourner le cerveau ! Les meilleurs mémoires gagneront.', 10, 2, 4, NULL, NULL, 0, 0, '1', '0', '1', '3', '0', NULL),
	(74, 'Shou Dou Qi', 'Une sorte de mix entre le Shi Fou Mi et le jeu d\'échecs. Les pions sont des animaux.', 30, 2, 2, 5, NULL, 0, 0, '1', '0', '0', '3', '0', NULL),
	(75, 'Echecs', 'Le fameux. Deux empires se font la guerre sur la un plateau, entre les cavaliers, les fous et autres pions moyen-âgeux.', 20, 2, 2, NULL, NULL, 0, 0, '1', '0', '0', '3', '0', NULL),
	(91, 'Ghooost!', 'Bienvenue dans votre manoir hanté ! Le but ? Chasser les fantômes... avec des fantômes plus effrayants encore !', 15, 2, 6, 6, NULL, 0, 0, '1', '0', '2', '1', '0', NULL);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;

-- Listage de la structure de la table ludotheque. game_theme
CREATE TABLE IF NOT EXISTS `game_theme` (
  `game_id` int NOT NULL,
  `theme_id` int NOT NULL,
  PRIMARY KEY (`game_id`,`theme_id`),
  KEY `fk_theme_game_theme` (`theme_id`),
  CONSTRAINT `fk_game_game_theme` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `fk_theme_game_theme` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table ludotheque.game_theme : ~17 rows (environ)
DELETE FROM `game_theme`;
/*!40000 ALTER TABLE `game_theme` DISABLE KEYS */;
INSERT INTO `game_theme` (`game_id`, `theme_id`) VALUES
	(52, 1),
	(42, 2),
	(50, 2),
	(4, 3),
	(13, 3),
	(26, 3),
	(69, 3),
	(72, 4),
	(43, 5),
	(63, 5),
	(67, 5),
	(11, 6),
	(12, 6),
	(14, 6),
	(55, 6),
	(10, 7),
	(11, 7),
	(2, 8),
	(47, 8),
	(72, 8);
/*!40000 ALTER TABLE `game_theme` ENABLE KEYS */;

-- Listage de la structure de la table ludotheque. picture
CREATE TABLE IF NOT EXISTS `picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('int','ext') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_picture` (`game_id`),
  CONSTRAINT `fk_game_picture` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table ludotheque.picture : ~62 rows (environ)
DELETE FROM `picture`;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` (`id`, `image`, `type`, `game_id`) VALUES
	(1, '18-soldats-du-feu_1.webp', 'int', 1),
	(2, '18-soldats-du-feu_2.webp', 'int', 1),
	(3, '18-soldats-du-feu_ext.webp', 'ext', 1),
	(4, 'sans-foi-ni-loi_ext.webp', 'ext', 56),
	(5, 'sans-foi-ni-loi_1.webp', 'int', 56),
	(6, 'sans-foi-ni-loi_2.webp', 'int', 56),
	(7, 'paf-le-singe_ext.webp', 'ext', 46),
	(8, 'paf-le-singe_1.webp', 'int', 46),
	(9, 'paf-le-singe_2.webp', 'int', 46),
	(10, 'paf-le-singe_3.webp', 'int', 46),
	(11, 'the-bugs_1.webp', 'int', 9),
	(12, 'the-bugs_2.webp', 'int', 9),
	(13, 'the-bugs_ext.webp', 'ext', 9),
	(14, 'sutaku_ext.webp', 'ext', 63),
	(15, 'il-etait-une-fois_ext.webp', 'ext', 28),
	(16, 'il-etait-une-fois_2.webp', 'int', 28),
	(17, 'il-etait-une-fois_1.webp', 'int', 28),
	(18, 'sutaku_1.webp', 'int', 63),
	(19, 'siggil_1.webp', 'int', 60),
	(20, 'siggil_ext.webp', 'ext', 60),
	(21, 'pollen_ext.webp', 'ext', 50),
	(22, 'pollen_1.webp', 'int', 50),
	(23, 'pollen_2.webp', 'int', 50),
	(24, 'pitchcar_ext.webp', 'ext', 48),
	(25, 'pitchcar_1.webp', 'int', 48),
	(26, 'pitchcar_2.webp', 'int', 48),
	(27, 'migrato_ext.webp', 'ext', 42),
	(28, 'migrato_1.webp', 'int', 42),
	(29, 'migrato_2.webp', 'int', 42),
	(30, 'migrato_3.webp', 'int', 42),
	(31, 'les-loups-garous-de-thierceleux_ext.webp', 'ext', 36),
	(32, 'les-loups-garous-de-thierceleux_1.webp', 'int', 36),
	(33, 'les-loups-garous-de-thierceleux_2.webp', 'int', 36),
	(34, 'le-bois-de-couadsous_ext.webp', 'ext', 73),
	(35, 'le-bois-de-couadsous_1.webp', 'int', 73),
	(36, 'le-bois-de-couadsous_2.webp', 'int', 73),
	(37, 'la-glace-et-le-ciel_ext.webp', 'ext', 33),
	(38, 'la-glace-et-le-ciel_1.webp', 'int', 33),
	(39, 'la-glace-et-le-ciel_2.webp', 'int', 33),
	(40, 'hanabi-ikebana_ext.webp', 'ext', 27),
	(41, 'hanabi-ikebana_1.webp', 'int', 27),
	(42, 'guerre-et-beeeh_ext.webp', 'ext', 26),
	(43, 'guerre-et-beeeh_1.webp', 'int', 26),
	(44, 'guerre-et-beeeh_2.webp', 'int', 26),
	(45, 'bandido_ext.webp', 'ext', 6),
	(46, 'bandido_1.webp', 'int', 6),
	(47, 'bandido_2.webp', 'int', 6),
	(48, 'bamboleo_ext.webp', 'ext', 5),
	(49, 'bamboleo_1.webp', 'int', 5),
	(50, 'bamboleo_2.webp', 'int', 5),
	(51, '6-qui-prend_ext.webp', 'ext', 3),
	(52, '6-qui-prend_1.webp', 'int', 3),
	(53, 'race-for-the-galaxy_ext.webp', 'ext', 52),
	(54, 'race-for-the-galaxy_1.webp', 'int', 52),
	(55, 'race-for-the-galaxy_2.webp', 'int', 52),
	(56, 'siam_ext.webp', 'ext', 59),
	(57, 'siam_1.webp', 'int', 59),
	(58, 'tumbin-dice_ext.webp', 'ext', 68),
	(59, 'tumbin-dice_1.webp', 'int', 68),
	(60, 'tumbin-dice_2.webp', 'int', 68),
	(61, 'zombies_ext.webp', 'ext', 72),
	(62, 'zombies_1.webp', 'int', 72),
	(63, 'zombies_2.webp', 'int', 72),
	(64, '51e-etat_1.webp', 'int', 2),
	(65, '51e-etat_2.webp', 'int', 2),
	(66, '51e-etat_ext.webp', 'int', 2),
	(67, 'diaballik_1.webp', 'int', 19),
	(68, 'diaballik_ext.webp', 'ext', 19),
	(69, 'polarity_1.webp', 'int', 49),
	(70, 'polarity_ext.webp', 'ext', 49),
	(71, 'camelot_ext.webp', 'ext', 10),
	(72, 'camelot_1.webp', 'int', 10),
	(73, 'camelot_2.webp', 'int', 10),
	(74, 'camelot_3.webp', 'int', 10),
	(75, 'carcassonne-a-la-prehistoire_ext.webp', 'ext', 12),
	(76, 'carcassonne-a-la-prehistoire_1.webp', 'int', 12),
	(77, 'carcassonne-a-la-prehistoire_2.webp', 'int', 12),
	(78, 'carcassonne-la-cite_ext.webp', 'ext', 11),
	(79, 'carcassonne-la-cite_1.webp', 'int', 11),
	(80, 'carcassonne-la-cite_2.webp', 'int', 11),
	(81, 'ghooost_ext.webp', 'ext', 91),
	(82, 'ghooost_1.webp', 'int', 91),
	(83, 'ghooost_2.webp', 'int', 91),
	(84, 'roll-through-the-ages_ext.webp', 'ext', 55),
	(85, 'roll-through-the-ages_1.webp', 'int', 55),
	(86, 'roll-through-the-ages_2.webp', 'int', 55),
	(87, 'shou-dou-qi_ext.webp', 'ext', 74),
	(88, 'shou-dou-qi_1.webp', 'int', 74),
	(89, 'tsuro_ext.webp', 'ext', 67),
	(90, 'tsuro_1.webp', 'int', 67);
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;

-- Listage de la structure de la table ludotheque. theme
CREATE TABLE IF NOT EXISTS `theme` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table ludotheque.theme : ~8 rows (environ)
DELETE FROM `theme`;
/*!40000 ALTER TABLE `theme` DISABLE KEYS */;
INSERT INTO `theme` (`id`, `name`) VALUES
	(3, 'animaux'),
	(8, 'apocalypse'),
	(5, 'Asie'),
	(1, 'espace'),
	(4, 'Halloween'),
	(6, 'histoire'),
	(7, 'Moyen-âge'),
	(2, 'nature');
/*!40000 ALTER TABLE `theme` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
