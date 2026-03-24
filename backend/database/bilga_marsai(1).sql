-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-bilga.alwaysdata.net
-- Generation Time: Mar 24, 2026 at 03:50 PM
-- Server version: 10.11.15-MariaDB
-- PHP Version: 8.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bilga_marsai`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','super admin','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `login`, `password`, `role`) VALUES
(17, 'superadmin', '$2b$10$FVhf9aW/DYV/Y.ZNZEOqxew1KXHV4X06nNMQppkWf7extBh.Hyb6O', 'super admin'),
(18, 'admin', '$2b$10$y/0CcNnbg5lre9EEnUJSdO0oQ4GZd/8oycbMweYWmr1lDL../z9IW', 'admin'),
(25, 'admin@test.com', '$2b$10$FZnFXPkQceWND7B41sYM7e0DjKPfqpsLTx2dIMYw8Uh0yOBp8uAKK', 'admin'),
(32, 'cosmin@example.com', NULL, 'admin'),
(33, 'toto@ert.fr', NULL, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `name` varchar(50) NOT NULL,
  `value` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`name`, `value`, `updated_at`) VALUES
('fb_link', 'https://www.facebook.com/LaPlateformeIO/?locale=fr_FR', '2026-03-23 15:28:21'),
('footer_message_en', 'Footer Message EN', '2026-03-23 15:40:49'),
('footer_message_fr', 'Footer Message FR', '2026-03-23 15:40:49'),
('insta_link', 'https://www.instagram.com/laplateformeio/', '2026-03-23 15:36:15'),
('phase', '2', '2026-03-24 08:55:07'),
('phase_2_date', '2026-05-12T09:00:00', '2026-03-18 07:50:12'),
('phase_3_date', '2026-07-12T09:00:00', '2026-03-16 14:26:36'),
('twitter_link', 'https://x.com/LaPlateformeIO', '2026-03-23 15:37:55'),
('youtube_link', 'https://www.youtube.com/c/LaPlateformeIO', '2026-03-23 15:37:00');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `iso_code` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `iso_code`) VALUES
(2, 'Afghanistan', 'AF'),
(3, 'Afrique du Sud', 'ZA'),
(4, 'Albanie', 'AL'),
(5, 'Algérie', 'DZ'),
(6, 'Allemagne', 'DE'),
(7, 'Andorre', 'AD'),
(8, 'Angola', 'AO'),
(9, 'Antigua-et-Barbuda', 'AG'),
(10, 'Arabie saoudite', 'SA'),
(11, 'Argentine', 'AR'),
(12, 'Arménie', 'AM'),
(13, 'Australie', 'AU'),
(14, 'Autriche', 'AT'),
(15, 'Azerbaïdjan', 'AZ'),
(16, 'Bahamas', 'BS'),
(17, 'Bahreïn', 'BH'),
(18, 'Bangladesh', 'BD'),
(19, 'Barbade', 'BB'),
(20, 'Belgique', 'BE'),
(21, 'Belize', 'BZ'),
(22, 'Bénin', 'BJ'),
(23, 'Bhoutan', 'BT'),
(24, 'Biélorussie', 'BY'),
(25, 'Bolivie', 'BO'),
(26, 'Bosnie-Herzégovine', 'BA'),
(27, 'Botswana', 'BW'),
(28, 'Brésil', 'BR'),
(29, 'Brunei', 'BN'),
(30, 'Bulgarie', 'BG'),
(31, 'Burkina Faso', 'BF'),
(32, 'Burundi', 'BI'),
(33, 'Cambodge', 'KH'),
(34, 'Cameroun', 'CM'),
(35, 'Canada', 'CA'),
(36, 'Cap-Vert', 'CV'),
(37, 'Chili', 'CL'),
(38, 'Chine', 'CN'),
(39, 'Chypre', 'CY'),
(40, 'Colombie', 'CO'),
(41, 'Comores', 'KM'),
(42, 'Congo', 'CG'),
(43, 'Congo (République démocratique du)', 'CD'),
(44, 'Corée du Nord', 'KP'),
(45, 'Corée du Sud', 'KR'),
(46, 'Costa Rica', 'CR'),
(47, 'Côte d’Ivoire', 'CI'),
(48, 'Croatie', 'HR'),
(49, 'Cuba', 'CU'),
(50, 'Danemark', 'DK'),
(51, 'Djibouti', 'DJ'),
(52, 'Dominique', 'DM'),
(53, 'Égypte', 'EG'),
(54, 'Émirats arabes unis', 'AE'),
(55, 'Équateur', 'EC'),
(56, 'Érythrée', 'ER'),
(57, 'Espagne', 'ES'),
(58, 'Estonie', 'EE'),
(59, 'Eswatini', 'SZ'),
(60, 'États-Unis', 'US'),
(61, 'Éthiopie', 'ET'),
(62, 'Fidji', 'FJ'),
(63, 'Finlande', 'FI'),
(64, 'France', 'FR'),
(65, 'Gabon', 'GA'),
(66, 'Gambie', 'GM'),
(67, 'Géorgie', 'GE'),
(68, 'Ghana', 'GH'),
(69, 'Grèce', 'GR'),
(70, 'Grenade', 'GD'),
(71, 'Guatemala', 'GT'),
(72, 'Guinée', 'GN'),
(73, 'Guinée-Bissau', 'GW'),
(74, 'Guinée équatoriale', 'GQ'),
(75, 'Guyana', 'GY'),
(76, 'Haïti', 'HT'),
(77, 'Honduras', 'HN'),
(78, 'Hongrie', 'HU'),
(79, 'Îles Marshall', 'MH'),
(80, 'Îles Salomon', 'SB'),
(81, 'Inde', 'IN'),
(82, 'Indonésie', 'ID'),
(83, 'Irak', 'IQ'),
(84, 'Iran', 'IR'),
(85, 'Irlande', 'IE'),
(86, 'Islande', 'IS'),
(87, 'Israël', 'IL'),
(88, 'Italie', 'IT'),
(89, 'Jamaïque', 'JM'),
(90, 'Japon', 'JP'),
(91, 'Jordanie', 'JO'),
(92, 'Kazakhstan', 'KZ'),
(93, 'Kenya', 'KE'),
(94, 'Kirghizistan', 'KG'),
(95, 'Kiribati', 'KI'),
(96, 'Koweït', 'KW'),
(97, 'Laos', 'LA'),
(98, 'Lesotho', 'LS'),
(99, 'Lettonie', 'LV'),
(100, 'Liban', 'LB'),
(101, 'Liberia', 'LR'),
(102, 'Libye', 'LY'),
(103, 'Liechtenstein', 'LI'),
(104, 'Lituanie', 'LT'),
(105, 'Luxembourg', 'LU'),
(106, 'Macédoine du Nord', 'MK'),
(107, 'Madagascar', 'MG'),
(108, 'Malaisie', 'MY'),
(109, 'Malawi', 'MW'),
(110, 'Maldives', 'MV'),
(111, 'Mali', 'ML'),
(112, 'Malte', 'MT'),
(113, 'Maroc', 'MA'),
(114, 'Maurice', 'MU'),
(115, 'Mauritanie', 'MR'),
(116, 'Mexique', 'MX'),
(117, 'Micronésie', 'FM'),
(118, 'Moldavie', 'MD'),
(119, 'Monaco', 'MC'),
(120, 'Mongolie', 'MN'),
(121, 'Monténégro', 'ME'),
(122, 'Mozambique', 'MZ'),
(123, 'Myanmar', 'MM'),
(124, 'Namibie', 'NA'),
(125, 'Nauru', 'NR'),
(126, 'Népal', 'NP'),
(127, 'Nicaragua', 'NI'),
(128, 'Niger', 'NE'),
(129, 'Nigéria', 'NG'),
(130, 'Norvège', 'NO'),
(131, 'Nouvelle-Zélande', 'NZ'),
(132, 'Oman', 'OM'),
(133, 'Ouganda', 'UG'),
(134, 'Ouzbékistan', 'UZ'),
(135, 'Pakistan', 'PK'),
(136, 'Palaos', 'PW'),
(137, 'Panama', 'PA'),
(138, 'Papouasie-Nouvelle-Guinée', 'PG'),
(139, 'Paraguay', 'PY'),
(140, 'Pays-Bas', 'NL'),
(141, 'Pérou', 'PE'),
(142, 'Philippines', 'PH'),
(143, 'Pologne', 'PL'),
(144, 'Portugal', 'PT'),
(145, 'Qatar', 'QA'),
(146, 'République centrafricaine', 'CF'),
(147, 'République dominicaine', 'DO'),
(148, 'République tchèque', 'CZ'),
(149, 'Roumanie', 'RO'),
(150, 'Royaume-Uni', 'GB'),
(151, 'Russie', 'RU'),
(152, 'Rwanda', 'RW'),
(153, 'Saint-Kitts-et-Nevis', 'KN'),
(154, 'Saint-Marin', 'SM'),
(155, 'Saint-Vincent-et-les-Grenadines', 'VC'),
(156, 'Sainte-Lucie', 'LC'),
(157, 'Salvador', 'SV'),
(158, 'Samoa', 'WS'),
(159, 'Sao Tomé-et-Principe', 'ST'),
(160, 'Sénégal', 'SN'),
(161, 'Serbie', 'RS'),
(162, 'Seychelles', 'SC'),
(163, 'Sierra Leone', 'SL'),
(164, 'Singapour', 'SG'),
(165, 'Slovaquie', 'SK'),
(166, 'Slovénie', 'SI'),
(167, 'Somalie', 'SO'),
(168, 'Soudan', 'SD'),
(169, 'Soudan du Sud', 'SS'),
(170, 'Sri Lanka', 'LK'),
(171, 'Suède', 'SE'),
(172, 'Suisse', 'CH'),
(173, 'Suriname', 'SR'),
(174, 'Syrie', 'SY'),
(175, 'Tadjikistan', 'TJ'),
(176, 'Tanzanie', 'TZ'),
(177, 'Tchad', 'TD'),
(178, 'Thaïlande', 'TH'),
(179, 'Timor oriental', 'TL'),
(180, 'Togo', 'TG'),
(181, 'Tonga', 'TO'),
(182, 'Trinité-et-Tobago', 'TT'),
(183, 'Tunisie', 'TN'),
(184, 'Turkménistan', 'TM'),
(185, 'Turquie', 'TR'),
(186, 'Tuvalu', 'TV'),
(187, 'Ukraine', 'UA'),
(188, 'Uruguay', 'UY'),
(189, 'Vanuatu', 'VU'),
(190, 'Vatican', 'VA'),
(191, 'Venezuela', 'VE'),
(192, 'Viêt Nam', 'VN'),
(193, 'Yémen', 'YE'),
(194, 'Zambie', 'ZM'),
(195, 'Zimbabwe', 'ZW');

-- --------------------------------------------------------

--
-- Table structure for table `editions`
--

CREATE TABLE `editions` (
  `id` int(11) NOT NULL,
  `year` year(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phase` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `editions`
--

INSERT INTO `editions` (`id`, `year`, `name`, `phase`) VALUES
(1, '0000', 'Edition 2026', 1);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `type` enum('atelier','','','') NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `info` text NOT NULL,
  `place` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `cover_image` varchar(100) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `type`, `name`, `url`, `logo`, `info`, `place`, `duration`, `cover_image`, `date`) VALUES
(9, 'atelier', 'sapin', 'rezzr', '59bad2240ae318897a1b7dc9e9b89fa8c72fad80.webp', 'bla', 'sapin', 2147483647, '59bad2240ae318897a1b7dc9e9b89fa8c72fad80.webp', '2026-02-24 16:38:00');

-- --------------------------------------------------------

--
-- Table structure for table `highlights`
--

CREATE TABLE `highlights` (
  `id` int(11) NOT NULL,
  `video_id` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `link_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jury`
--

CREATE TABLE `jury` (
  `id` int(11) NOT NULL,
  `edition_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `bio` varchar(200) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `profession` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `jury`
--

INSERT INTO `jury` (`id`, `edition_id`, `name`, `bio`, `photo`, `profession`) VALUES
(42, 1, 'Liam Westworth', 'Réalisateur des films britannique, connu pour la série \"Jude\"', '62995b5cf99a80885df63eed1b8f230ef14e19a6.webp', 'Réalisateur'),
(43, 1, 'Charles Perrot', 'Membre du comité de l\'Academie Française du Film, il présidera cette edition', '14abfd969695caaf7c4e1e0667d854088faa66b4.webp', 'Président Jury'),
(46, 1, 'Aida Phillips', 'Expérte en effets spéciaux pour des grands studios français', 'e89b1b3b77890052b6d1919c4a482994599020c8.webp', 'VFX Artist'),
(47, 1, 'Marcel Diaz', 'Passioné de tech, il a fondé une startup pour la génération d\'images avec l\'IA', '2521f2b6d96ca0c659df29fa37a550dffdeafc7a.webp', 'CEO'),
(48, 1, 'Lara Bassot', 'Etudiante en théatre, elle s\'interesse aux emotions transmises par les films', '37e6860649f00aa0be2c2eafe9a25bed3291811f.webp', 'Etudiante'),
(55, 1, 'Pierre', 'Il aime les films mais pas l\'IA', '2521f2b6d96ca0c659df29fa37a550dffdeafc7a.webp', 'Boulanger');

-- --------------------------------------------------------

--
-- Table structure for table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `newsletters`
--

INSERT INTO `newsletters` (`id`, `email`) VALUES
(8, 'd@toto.fr'),
(11, 'efazedz@gt.gt'),
(4, 'email@test.fr'),
(10, 'frfr@gt.gt'),
(19, 'hnr@gmail.com'),
(9, 'r@rr.tg'),
(13, 'sdzdaz@ezdfzae.fr'),
(18, 'smr@gmail.com'),
(17, 'soumare@gmail.com'),
(12, 'zdazdaz@gt.d');

-- --------------------------------------------------------

--
-- Table structure for table `prized_videos`
--

CREATE TABLE `prized_videos` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `prix` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `prized_videos`
--

INSERT INTO `prized_videos` (`id`, `video_id`, `prix`) VALUES
(1, 204, 'Test'),
(2, 170, 'dazdaz'),
(4, 165, 'Meillur cookie'),
(5, 176, 'test'),
(8, 171, 'MEilleur Ivann'),
(9, 177, 'meilleur pierre'),
(10, 204, 'cosmin'),
(12, 204, 'eeeee');

-- --------------------------------------------------------

--
-- Table structure for table `process_queue`
--

CREATE TABLE `process_queue` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `status` enum('pending','done','error','timeout') NOT NULL DEFAULT 'pending',
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `filename` varchar(100) NOT NULL,
  `type` enum('yt_upload','yt_status_check','s3_upload','') NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `process_queue`
--

INSERT INTO `process_queue` (`id`, `video_id`, `status`, `date`, `filename`, `type`, `updated_at`) VALUES
(19, 170, 'pending', '2026-03-03 13:33:21', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'yt_status_check', '2026-03-03 13:33:21'),
(20, 171, 'pending', '2026-03-03 13:35:51', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'yt_status_check', '2026-03-03 13:35:51'),
(21, 176, 'pending', '2026-03-04 13:59:18', '35c4d224754419d20a5b4b9b64582bec2df6a712.mp4', 'yt_status_check', '2026-03-04 13:59:18'),
(22, 177, 'pending', '2026-03-05 08:31:14', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'yt_status_check', '2026-03-05 08:31:14'),
(23, 178, 'pending', '2026-03-05 08:35:21', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'yt_status_check', '2026-03-05 08:35:21'),
(33, 204, 'pending', '2026-03-05 20:11:18', '06bf485460e29e6a022c64924f3ac32d150ec7e2.mp4', 'yt_status_check', '2026-03-05 20:11:18'),
(35, 206, 'pending', '2026-03-13 09:43:32', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'yt_status_check', '2026-03-13 09:43:32'),
(36, 207, 'pending', '2026-03-19 10:10:51', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'yt_status_check', '2026-03-19 10:10:51'),
(37, 208, 'pending', '2026-03-23 13:53:29', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'yt_status_check', '2026-03-23 13:53:29'),
(38, 209, 'pending', '2026-03-23 13:54:30', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'yt_status_check', '2026-03-23 13:54:30'),
(39, 210, 'pending', '2026-03-24 07:54:50', '5f2cd406cb5ace525602c9569032ebce0a442712.mp4', 'yt_status_check', '2026-03-24 07:54:50');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `event_id`, `firstname`, `lastname`, `email`) VALUES
(28, 9, 'a', 'e', 'a@z.fe');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `note` varchar(300) NOT NULL,
  `grade` int(11) NOT NULL DEFAULT 0,
  `status` enum('assigned','done','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `admin_id`, `video_id`, `note`, `grade`, `status`) VALUES
(53, 17, 165, '', 0, 'done'),
(55, 17, 160, '', 0, 'assigned'),
(56, 17, 176, 'nul', 1, 'done'),
(58, 17, 162, 'teapot', 3, 'done'),
(59, 17, 206, '', 0, 'assigned'),
(62, 17, 204, 'yes', 4, 'done'),
(63, 17, 178, 'Trop drole', 4, 'done'),
(65, 17, 159, 'Meilleur producteur', 4, 'done'),
(66, 17, 207, '', 0, 'assigned'),
(67, 17, 177, '', 0, 'assigned'),
(68, 17, 177, '', 0, 'assigned'),
(69, 17, 175, '', 4, 'done'),
(70, 17, 171, '', 2, 'done');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `name` varchar(50) NOT NULL,
  `value` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`name`, `value`, `updated_at`) VALUES
('azdaz', 'azda', '2026-03-10 09:58:16'),
('azdazda', 'azdad', '2026-03-10 09:58:16'),
('ddd', 'dd', '2026-03-10 10:50:00'),
('ee', 'ee', '2026-03-10 10:50:09'),
('test', 'bilgaa', '2026-03-12 12:33:44');

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `id` int(11) NOT NULL,
  `edition_id` int(11) NOT NULL,
  `type` enum('official','media','technical','other') NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `logo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `sponsors`
--

INSERT INTO `sponsors` (`id`, `edition_id`, `type`, `name`, `url`, `logo`) VALUES
(33, 1, 'official', 'Mobile Film Festival', 'www.mobilefilmfestival.com', '948f25d3ddfd478e8af216d904052f19cf019164.webp'),
(34, 1, 'other', 'Mairie de Marseille', 'www.marseille.fr', '4ab8d2903fdd51cf5a148849b4780ceaad714f09.webp'),
(35, 1, 'media', 'Le Monde', 'www.lemonde.fr', '68e1db043475d2495337721f9f94fdb18db83820.webp'),
(37, 1, 'official', 'La Plateforme', 'www.laplateforme.io', '11e4f8a60c1d562185ff1ada3d759fb9a9daddea.webp'),
(38, 1, 'media', 'Le Figaro', 'www.lefigaro.fr', 'fe2133081e4d44180291034f3d46b41596503e70.webp'),
(39, 1, 'technical', 'SONY', 'www.sony.fr', 'a844ab90080595c521fb840167d1752c8967ad7b.webp');

-- --------------------------------------------------------

--
-- Table structure for table `subtitles`
--

CREATE TABLE `subtitles` (
  `id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `language` enum('french','english','','') NOT NULL,
  `filename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','used','revoked') DEFAULT 'pending',
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `value`, `created_at`, `status`, `admin_id`) VALUES
(9, 'azerty', '2026-02-06 12:39:21', 'used', 17),
(10, '65af94c9-d207-4349-9b15-e69e6c159dea', '2026-02-06 13:40:28', 'used', 18),
(14, '64963c28-3464-4964-b867-c686eb08e54d', '2026-02-09 09:54:29', 'used', 25),
(21, '41176d48-27fb-49e1-b002-bea90baea4e1', '2026-03-03 13:18:29', 'pending', 32),
(22, 'a9eba316-acaf-446b-a7f9-e80c6b228ae8', '2026-03-06 07:14:58', 'pending', 33);

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `edition_id` int(11) NOT NULL,
  `url` varchar(100) DEFAULT NULL,
  `filename` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cover_image` varchar(100) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `status` enum('unverified','verified','selected','denied') NOT NULL DEFAULT 'unverified',
  `country_id` int(11) NOT NULL,
  `producer` varchar(50) NOT NULL,
  `producer_image` varchar(100) DEFAULT NULL,
  `scenario_ai` varchar(50) DEFAULT NULL,
  `video_gen_ai` varchar(50) DEFAULT NULL,
  `sound_ai` varchar(50) DEFAULT NULL,
  `postprod_ai` varchar(50) DEFAULT NULL,
  `tags` varchar(100) NOT NULL,
  `production_type` enum('hybrid','ai_only','','') NOT NULL DEFAULT 'ai_only',
  `socials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `edition_id`, `url`, `filename`, `email`, `cover_image`, `title`, `description`, `status`, `country_id`, `producer`, `producer_image`, `scenario_ai`, `video_gen_ai`, `sound_ai`, `postprod_ai`, `tags`, `production_type`, `socials`) VALUES
(139, 1, 'Q4sQo5UK5TQ', '37134502a3535306c8638ffc0d2e2eab0e5ad441.webp', 'lucas.rozotte@laplateforme.io', '37134502a3535306c8638ffc0d2e2eab0e5ad441.webp', 'Fazor', 'Une colonie sur Mars, premier pas vers l\'exploration de l\'univers', 'verified', 2, 'Lucas Rozotte', '37134502a3535306c8638ffc0d2e2eab0e5ad441.webp', 'ChatGPT,Claude,Gemini', 'Sora', '-', '-', 'laser, IA, futur', 'ai_only', '[]'),
(153, 1, 'Q4sQo5UK5TQ', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'jeandujardinier@email.com', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Une Journée sur Mars', 'Une colonie humaine sur Mars, elle a développé la vie sur la planète rouge, et commence à rendre la la planète habitable', 'unverified', 64, 'Jean Dujardinier', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'ChatGpt', 'Firefly', 'Aucune', 'Gemini', '#HumanOnMars #Future', 'ai_only', '[]'),
(155, 1, 'Q4sQo5UK5TQ', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'jeandujardinier@email.com', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Une Journée sur Mars', 'Une colonie humaine sur Mars, elle a développé la vie sur la planète rouge, et commence à rendre la la planète habitable', 'unverified', 64, 'Jean Dujardinier', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'ChatGpt', 'Firefly', 'Aucune', 'Gemini', '#HumanOnMars #Future', 'ai_only', '[]'),
(159, 1, '8atyfZGZtzo', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'cosmin@example.com', 'b8e80aa0872a3f33f1c16900da7826693ff30f9a.webp', 'La vie sur Mars', 'Une colonie sur Mars, premier pas vers l\'exploration de l\'univers', 'verified', 164, 'Cosmin Bilga', '62995b5cf99a80885df63eed1b8f230ef14e19a6.webp', 'ChatGPT', 'Sora', 'SoundAI', '-', '', 'ai_only', '[]'),
(160, 1, '_iGjJm5Hwfc', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'zzz@email.c', '8a21c6ee08e78e1d442d44364a53505960e32645.webp', 'Une Journée sur Mars', 'Une journée de plus sur la colonie de mars', 'unverified', 6, 'jean Dujardinier', '26bf04e09a96104c27d7eaea8c8d821e41566a2b.webp', 'Aucune', 'Firefly', 'Gemini', 'Gemini', 'z', 'ai_only', '[]'),
(161, 1, '08lIOunSA6U', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'test@example.com', '03b4b17669ed9ebf0fd5fb794c8b61263706ea36.webp', 'Un jour sur mars', 'La vie d\'une colonie sur Mars', 'verified', 64, 'Toto', '37134502a3535306c8638ffc0d2e2eab0e5ad441.webp', 'ChatGPT', 'Sora', '--', '-', 'IA', 'ai_only', '[]'),
(162, 1, 'Q1uO1XQIRDM', '06bf485460e29e6a022c64924f3ac32d150ec7e2.mp4', 'E', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Eeaeaeea', 'Ezaaeeaeae', 'unverified', 4, 'z', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'z', 'z', 'z', 'z', 'E', 'ai_only', '[]'),
(164, 1, 'gN_p4QJq_Ho', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'jeandujardinier@email.com', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Colonie Marsienne ', 'Je suis un marsien et je suis heureux', 'unverified', 3, 'Moi', 'b8e80aa0872a3f33f1c16900da7826693ff30f9a.webp', '', 'Firefly, Sora', '', '', '#Robot #GentilRobot #futur #utopie #chatgpt #Jardinage', 'ai_only', '[]'),
(165, 1, '1xFit8TW8w8', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'pierre@example.com', '37134502a3535306c8638ffc0d2e2eab0e5ad441.webp', 'Test1213', 'zedzaefsqcdazca', 'unverified', 69, 'Pierre', 'b8e80aa0872a3f33f1c16900da7826693ff30f9a.webp', 'ChatGPT', 'Firefly', '-', '-', 'IA', 'ai_only', '[]'),
(170, 1, 'Vtl97Nh7kFw', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'd@emial.ci', '92d5405fb3d2fbf2b6b04ca7001a96c9b0956cc0.webp', 'Cecei est un teste trop droleuh ouais poto', 'zqddzqdzqdqzdzqd', 'unverified', 11, 'zdqd', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'dzdqzdzqd', 'dzddq', 'zqdzqdzq', 'dzdzqd', 'zqdzqdqzdzqdqzd', 'ai_only', '[]'),
(171, 1, 'V_y90tY1VQk', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'd@emial.ci', '92d5405fb3d2fbf2b6b04ca7001a96c9b0956cc0.webp', 'Cecei est un teste trop droleuh ouais poto', 'zqddzqdzqdqzdzqd', 'verified', 11, 'zdqd', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'dzdqzdzqd', 'dzddq', 'zqdzqdzq', 'dzdzqd', '', 'ai_only', '[]'),
(175, 1, '', 'video_test.mp4', 'test@test.com', '59bad2240ae318897a1b7dc9e9b89fa8c72fad80.webp', 'Ma superbe vidéo', 'Une vidéo générée par IA', 'unverified', 2, '', '', '', '', '', '', '', 'ai_only', '[]'),
(176, 1, 'ack8TtMt9zg', '35c4d224754419d20a5b4b9b64582bec2df6a712.mp4', 'rozottel@outlook.fr', '59bad2240ae318897a1b7dc9e9b89fa8c72fad80.webp', 'mon film', 'je l\'ait fait', 'unverified', 85, 'moi', '59bad2240ae318897a1b7dc9e9b89fa8c72fad80.webp', 'moi', 'moi', 'moi', 'moi', 'moi', 'ai_only', '[]'),
(177, 1, 'ikqtSc3HPIk', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'e@e.c', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Une journée sur Mars', 'Une journée sur Mars', 'verified', 3, 'Une journée sur Mars', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Une journée sur Mars', 'Une journée sur Mars', 'Une journée sur MarsUne journée sur Mars', 'Une journée sur Mars', '', 'ai_only', '[]'),
(178, 1, 'DICvcui-xAs', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'e@e.c', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Une journée sur Mars', 'Une journée sur Mars', 'verified', 3, 'Une journée sur Mars', '76b20e1c83d2a43f6bb4d911dfc192d68dd8d6a4.webp', 'Une journée sur Mars', 'Une journée sur Mars', 'Une journée sur MarsUne journée sur Mars', 'Une journée sur Mars', '#Mars,', 'ai_only', '[]'),
(204, 1, 'rxGnwwg0Xnc', '06bf485460e29e6a022c64924f3ac32d150ec7e2.mp4', 'jeandujardinier@email.com', '43143f7eb5000f64830b288167217fbb659d6322.webp', 'Une journée sur Mars', 'Ajourd\'hui, ce 17 septembre 2567, le soleil se lève sur m-3816, la nouvelle colonie marsienne en pleine expension, rassemblant les meilleurs scientifiques de la Terre pour une mission cruciale : recréer une atmosphère sur la planète rouge, et rendre à cette dernière la vie qu\'elle a un jour abritée', 'verified', 64, 'Jean Dujardinier', 'b37a77bd5e0c7db8a5affab5c822fc7b4d6349e6.webp', 'ChatGpt', 'Firefly', 'SouncloudAI', 'ChatGPT', '', 'ai_only', '[]'),
(206, 1, 'wvahBE6bAqc', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'pierre.aubree@laplateforme.io', '14abfd969695caaf7c4e1e0667d854088faa66b4.webp', 'ia film', 'lorem ipsum', 'unverified', 17, 'i', '', '', '', '', '', '', 'ai_only', '[]'),
(207, 1, 'LG70XCi1w2M', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'pierre.canet@laplateforme.io', 'b27bb306bd5dc9bbbb0f37dd471808025a307851.webp', 'option.startsWith(\'http\')', 'option.startsWith(\'http\')', 'unverified', 17, 'option.startsWith(\'http\')', '', '', '', '', '', '', 'ai_only', '[\"https://youtube.com\",\"https://youtube.com\",\"https://tiktok.com\",\"https://e.eu\"]'),
(208, 1, 'xy6aZ1i0uOQ', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'pierre.canet@laplateforme.io', 'b27bb306bd5dc9bbbb0f37dd471808025a307851.webp', 'Placeholder', 'Placeholder', 'unverified', 2, 'Placeholder', NULL, NULL, NULL, NULL, NULL, '', 'ai_only', '[\"https://Placeholder\",\"https://Placeholder\",\"https://Placeholder\",\"https://Placeholder\"]'),
(209, 1, 'gEuI15Jmfmk', '200ffd1b4699f8a5a3d33714f5b6f722978df4c9.mp4', 'pierre.canet@laplateforme.io', 'b27bb306bd5dc9bbbb0f37dd471808025a307851.webp', 'Placeholder', 'Placeholder', 'unverified', 2, 'Placeholder', NULL, NULL, NULL, NULL, NULL, '', 'ai_only', '[\"https://Placeholder\",\"https://Placeholder\",\"https://Placeholder\"]'),
(210, 1, 'ZKQ2D8OAzPs', '5f2cd406cb5ace525602c9569032ebce0a442712.mp4', 'lucas.rozotte@laplateforme.io', 'b0ab09b777d1fbdf779aeccab7268d18f7b4fcf8.webp', 'is that the bite of 87!!!!!!', 'big chomper', 'unverified', 64, 'moi', '59bad2240ae318897a1b7dc9e9b89fa8c72fad80.webp', 'moi', 'moi', 'moi', 'moi', '', 'ai_only', '[\"https://fr.linkedin.com/\",\"https://www.youtube.com/\",\"https://www.tiktok.com/fr/\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `name_2` (`name`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `editions`
--
ALTER TABLE `editions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `highlights`
--
ALTER TABLE `highlights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_highlights_active_created` (`is_active`,`created_at`),
  ADD KEY `idx_highlights_video_id` (`video_id`);

--
-- Indexes for table `jury`
--
ALTER TABLE `jury`
  ADD PRIMARY KEY (`id`),
  ADD KEY `edition_id` (`edition_id`);

--
-- Indexes for table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `prized_videos`
--
ALTER TABLE `prized_videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_id_2` (`video_id`);

--
-- Indexes for table `process_queue`
--
ALTER TABLE `process_queue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `name_2` (`name`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `edition_id` (`edition_id`);

--
-- Indexes for table `subtitles`
--
ALTER TABLE `subtitles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `edition_id` (`edition_id`),
  ADD KEY `country_id` (`country_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `editions`
--
ALTER TABLE `editions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `highlights`
--
ALTER TABLE `highlights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jury`
--
ALTER TABLE `jury`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `prized_videos`
--
ALTER TABLE `prized_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `process_queue`
--
ALTER TABLE `process_queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `subtitles`
--
ALTER TABLE `subtitles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `highlights`
--
ALTER TABLE `highlights`
  ADD CONSTRAINT `fk_highlights_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `jury`
--
ALTER TABLE `jury`
  ADD CONSTRAINT `jury_ibfk_1` FOREIGN KEY (`edition_id`) REFERENCES `editions` (`id`);

--
-- Constraints for table `prized_videos`
--
ALTER TABLE `prized_videos`
  ADD CONSTRAINT `prized_videos_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `process_queue`
--
ALTER TABLE `process_queue`
  ADD CONSTRAINT `process_queue_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD CONSTRAINT `sponsors_ibfk_1` FOREIGN KEY (`edition_id`) REFERENCES `editions` (`id`);

--
-- Constraints for table `subtitles`
--
ALTER TABLE `subtitles`
  ADD CONSTRAINT `subtitles_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`edition_id`) REFERENCES `editions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
