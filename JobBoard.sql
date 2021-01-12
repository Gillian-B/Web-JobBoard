-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 14 oct. 2020 à 10:01
-- Version du serveur :  8.0.21-0ubuntu0.20.04.4
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `JobBoard`
--

-- --------------------------------------------------------

--
-- Structure de la table `Advertisements`
--

CREATE TABLE `Advertisements` (
  `id` int NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `company` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Advertisements`
--

INSERT INTO `Advertisements` (`id`, `title`, `summary`, `company`) VALUES
(1, 'Routier', 'Conduire', 2),
(2, 'Testeur', 'Tester', 3),
(3, 'Dompteur de lion', 'Dompter', 2);

-- --------------------------------------------------------

--
-- Structure de la table `Companies`
--

CREATE TABLE `Companies` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Companies`
--

INSERT INTO `Companies` (`id`, `name`) VALUES
(1, 'StuctureCop'),
(2, 'KaibaCorp'),
(3, 'LeMedef'),
(4, 'Danone');

-- --------------------------------------------------------

--
-- Structure de la table `Job`
--

CREATE TABLE `Job` (
  `id_job` int NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `wage` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `place` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `working_time` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Job`
--

INSERT INTO `Job` (`id_job`, `description`, `wage`, `place`, `working_time`) VALUES
(1, 'Conduire le camion de la gloire', '2000€', 'VIllefranche, France', '35h / semaine'),
(2, 'Essayer c\'est le plus important', '5000€', 'Nantes, France ', '43h / semaine'),
(3, 'Dompter des lions et ne pas mourir', '1200€', 'Pinder, Italie', '50h / semaine');

-- --------------------------------------------------------

--
-- Structure de la table `People`
--

CREATE TABLE `People` (
  `id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `People`
--

INSERT INTO `People` (`id`, `first_name`, `last_name`, `email`, `phone`, `password`) VALUES
(1, 'Admin', 'Admin', 'Admin@Admin', '0100000000', '$2b$10$S2QK1Ib5GDPh4EV7QfxsVOMzjgY/PjLf0qdB28N9v3hMaRJkviffe'),
(3, 'Ulrick', 'Marchall', 'ulrick.marchall@test.com', '100000000', NULL),
(4, 'Denzell', 'Troyes', 'mail.test@test.com', '100005900', NULL),
(6, 'philippe', 'robert', 'philippe.rorbert2@mail.fr', '0645397865', '$2b$10$rkXXF55vv1HVWQkY9t5IFeZkTlKyhIJtLp22GsvwcJYtVGIlOw5Uu'),
(8, 'Maxence', 'Pliroir', 'maxence@mail.fr', '0651292835', '$2b$10$ggRpjanxvkS9aHLeMRuiy.LY/sqDyJ6M44pVdUlSYSYDCTqixMpLy');

-- --------------------------------------------------------

--
-- Structure de la table `Relation`
--

CREATE TABLE `Relation` (
  `id_ad` int NOT NULL,
  `id_people` int NOT NULL,
  `is_in_charge` tinyint(1) NOT NULL,
  `data_mail` varchar(1010) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Relation`
--

INSERT INTO `Relation` (`id_ad`, `id_people`, `is_in_charge`, `data_mail`) VALUES
(2, 3, 0, 'Bonjour, ci-joint.'),
(2, 4, 1, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Advertisements`
--
ALTER TABLE `Advertisements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company` (`company`);

--
-- Index pour la table `Companies`
--
ALTER TABLE `Companies`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Job`
--
ALTER TABLE `Job`
  ADD PRIMARY KEY (`id_job`);

--
-- Index pour la table `People`
--
ALTER TABLE `People`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `Relation`
--
ALTER TABLE `Relation`
  ADD PRIMARY KEY (`id_ad`,`id_people`),
  ADD KEY `fk_people` (`id_people`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Advertisements`
--
ALTER TABLE `Advertisements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `Companies`
--
ALTER TABLE `Companies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `People`
--
ALTER TABLE `People`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Advertisements`
--
ALTER TABLE `Advertisements`
  ADD CONSTRAINT `fk_company` FOREIGN KEY (`company`) REFERENCES `Companies` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Job`
--
ALTER TABLE `Job`
  ADD CONSTRAINT `fk_job` FOREIGN KEY (`id_job`) REFERENCES `Advertisements` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `Relation`
--
ALTER TABLE `Relation`
  ADD CONSTRAINT `fk_ad` FOREIGN KEY (`id_ad`) REFERENCES `Advertisements` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_people` FOREIGN KEY (`id_people`) REFERENCES `People` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
