-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2026 at 03:09 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `visitkirehe`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodations`
--

CREATE TABLE `accommodations` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price_range` varchar(20) DEFAULT NULL,
  `price_min` int(11) DEFAULT NULL,
  `price_max` int(11) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accommodations`
--

INSERT INTO `accommodations` (`id`, `name`, `location`, `description`, `price_range`, `price_min`, `price_max`, `rating`, `image`, `contact`, `created_at`) VALUES
('1', 'Kirehe Lakeside Lodge', 'Near Lake Nasho', 'Comfortable lodge with lake views.', '$$', 40, 80, 4.5, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600', NULL, '2026-03-16 00:06:04'),
('2', 'Rusumo Guest House', 'Rusumo Town', 'Budget-friendly stay near Rusumo Falls.', '$', 15, 35, 4.0, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600', NULL, '2026-03-16 00:06:04'),
('3', 'Eastern Plains Resort', 'Kirehe District', 'Upscale resort with safari experiences.', '$$$', 80, 150, 4.8, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600', NULL, '2026-03-16 00:06:04'),
('4', 'Mahama View Hotel', 'Mahama Sector', 'Scenic hotel with hill and valley views.', '$$', 35, 65, 4.3, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600', NULL, '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(20) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `title`, `description`, `icon`, `image`, `sort_order`, `created_at`) VALUES
('boat', 'Boat Rides', 'Enjoy peaceful boat trips on Lake Nasho and nearby water bodies with stunning views.', '🛶', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', 3, '2026-03-16 00:06:04'),
('cultural', 'Cultural Experiences', 'Meet local communities, learn traditional dance, taste authentic Rwandan cuisine, and hear local stories.', '🎭', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600', 2, '2026-03-16 00:06:04'),
('markets', 'Local Markets', 'Explore vibrant markets, buy crafts, fresh produce, and experience daily life in Kirehe.', '🛒', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600', 4, '2026-03-16 00:06:04'),
('nature', 'Nature Exploration', 'Hike through lush landscapes, spot birds and wildlife, and enjoy the serene beauty of Kirehe.', '🌿', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', 1, '2026-03-16 00:06:04'),
('photography', 'Photography Spots', 'Capture breathtaking sunsets, landscapes, wildlife, and cultural moments across the district.', '📷', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', 6, '2026-03-16 00:06:04'),
('village', 'Village Tourism', 'Visit traditional villages, participate in farming activities, and connect with local families.', '🏘️', 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600', 5, '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `analytics`
--

CREATE TABLE `analytics` (
  `id` int(11) NOT NULL DEFAULT 1,
  `total_visitors` int(11) DEFAULT 0,
  `monthly_visitors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`monthly_visitors`)),
  `attraction_views` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attraction_views`)),
  `hotel_views` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`hotel_views`)),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `analytics`
--

INSERT INTO `analytics` (`id`, `total_visitors`, `monthly_visitors`, `attraction_views`, `hotel_views`, `updated_at`) VALUES
(1, 0, '[]', '{}', '{}', '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `attractions`
--

CREATE TABLE `attractions` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `map_link` varchar(500) DEFAULT NULL,
  `coordinates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`coordinates`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attractions`
--

INSERT INTO `attractions` (`id`, `name`, `slug`, `description`, `short_description`, `image`, `location`, `category`, `map_link`, `coordinates`, `created_at`) VALUES
('akagera-national-park', 'Akagera National Parks', 'akagera-national-park', 'Rwanda\'s only savanna park, home to the Big Five and diverse wildlife.', 'Rwanda\'s only savanna park, home to the Big Five and diverse wildlife.', '/uploads/1773620834998-WhatsApp-Image-2026-03-12-at-5.01.32-PM97.jpeg', 'Eastern Rwanda', 'Wildlife', '', '[]', '2026-03-16 00:06:04'),
('lake-nasho', 'Lake Nasho', 'lake-nasho', 'One of Rwanda\'s largest lakes, offering stunning views, bird watching, and peaceful boat rides.', 'One of Rwanda\'s largest lakes, offering stunning views, bird watching, and peace', '/uploads/1773620434335-WhatsApp-Image-2026-03-12-at-5.01.31-PM56.jpeg', 'Kirehe District', 'Nature', '', '[]', '2026-03-16 00:06:04'),
('mahama-landscape', 'Mahama Area Landscape', 'mahama-landscape', 'Rolling hills, tea plantations, and panoramic views of the Eastern Province.', 'Rolling hills, tea plantations, and panoramic views of the Eastern Province.', '/uploads/1773620458606-WhatsApp-Image-2026-03-12-at-5.01.29-PM.jpeg', 'Mahama Sector', 'Landscape', '', '[]', '2026-03-16 00:06:04'),
('rusumo-falls', 'Rusumo Falls', 'rusumo-falls', 'Magnificent waterfall on the Kagera River at the Rwanda-Tanzania border.', 'Magnificent waterfall on the Kagera River at the Rwanda-Tanzania border.', '/uploads/1773620749538-WhatsApp-Image-2026-03-12-at-5.01.30-PM0.jpeg', 'Rusumo Sector', 'Nature', '', '[]', '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `excerpt`, `content`, `author`, `image`, `date`, `slug`, `created_at`) VALUES
('1', '5 Must-See Spots in Kirehe District', 'From Lake Nasho to Rusumo Falls, discover the top attractions that make Kirehe a unique destination.', NULL, 'Visit Kirehe Team', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', '2025-02-10', '5-must-see-spots-kirehe', '2026-03-16 00:06:04'),
('2', 'A Guide to Cultural Tourism in Eastern Rwanda', 'How to experience authentic Rwandan culture, dance, and cuisine in Kirehe and surrounding areas.', NULL, 'Visit Kirehe Team', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800', '2025-01-28', 'cultural-tourism-eastern-rwanda', '2026-03-16 00:06:04'),
('3', 'Best Time to Visit Kirehe: Seasons and Wildlife', 'Plan your trip with our seasonal guide—when to see birds, enjoy boat rides, and avoid rain.', NULL, 'Visit Kirehe Team', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', '2025-01-15', 'best-time-visit-kirehe', '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `location`, `description`, `image`, `created_at`) VALUES
('1', 'Kirehe Cultural Festival', '2025-06-15', 'Kirehe Town', 'Annual celebration of local culture with dance, music, food, and crafts.', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600', '2026-03-16 00:06:04'),
('2', 'Lake Nasho Bird Watching Weekend', '2025-04-20', 'Lake Nasho', 'Guided bird watching tours and nature walks around the lake.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', '2026-03-16 00:06:04'),
('3', 'Rusumo Falls Heritage Day', '2025-07-01', 'Rusumo Falls', 'Commemoration and tours at the historic Rusumo border and waterfall.', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600', '2026-03-16 00:06:04'),
('4', 'Harvest Festival - Umuganura', '2025-08-01', 'Various Sectors', 'Traditional Rwandan harvest celebration with local food and ceremonies.', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600', '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` varchar(64) NOT NULL,
  `src` varchar(500) NOT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `src`, `alt`, `category`, `created_at`) VALUES
('1', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', 'Lake Nasho', 'Landscape', '2026-03-16 00:06:04'),
('2', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600', 'Rusumo Falls', 'Nature', '2026-03-16 00:06:04'),
('3', '/uploads/1773621140135-WhatsApp-Image-2026-03-12-at-5.01.48-PM758.jpeg', 'Cultural dance', 'Culture', '2026-03-16 00:06:04'),
('4', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600', 'Local market', 'Markets', '2026-03-16 00:06:04'),
('5', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', 'Hills of Kirehe', 'Landscape', '2026-03-16 00:06:04'),
('6', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600', 'Wildlife', 'Nature', '2026-03-16 00:06:04'),
('7', 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600', 'Village life', 'Culture', '2026-03-16 00:06:04'),
('8', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', 'Sunset', 'Landscape', '2026-03-16 00:06:04'),
('9', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', 'Forest trail', 'Nature', '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `site_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `instagram` varchar(500) DEFAULT NULL,
  `banner_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`banner_images`)),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `site_name`, `contact_email`, `phone`, `facebook`, `twitter`, `instagram`, `banner_images`, `updated_at`) VALUES
(1, 'Visit Kirehe', 'info@visitkirehe.rw', '+250785354935', NULL, NULL, NULL, NULL, '2026-03-16 00:16:09');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` varchar(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `rating` int(11) DEFAULT 5,
  `avatar` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `country`, `text`, `rating`, `avatar`, `created_at`) VALUES
('1', 'Sarah M.', 'USA', 'Kirehe exceeded all expectations. Lake Nasho at sunset was magical, and the warmth of the local people made our trip unforgettable.', 5, 'https://i.pravatar.cc/100?img=1', '2026-03-16 00:06:04'),
('2', 'Jean-Pierre K.', 'Belgium', 'Rusumo Falls is a hidden gem. Combined with a visit to Akagera, this was the perfect Rwandan adventure.', 5, 'https://i.pravatar.cc/100?img=12', '2026-03-16 00:06:04'),
('3', 'Amara O.', 'Nigeria', 'The cultural experiences and village tourism in Kirehe gave us a real sense of Rwanda beyond the usual tourist trail. Highly recommend.', 5, 'https://i.pravatar.cc/100?img=5', '2026-03-16 00:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `travel_info`
--

CREATE TABLE `travel_info` (
  `id` int(11) NOT NULL DEFAULT 1,
  `transport` text DEFAULT NULL,
  `best_time` text DEFAULT NULL,
  `safety` text DEFAULT NULL,
  `tips` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `travel_info`
--

INSERT INTO `travel_info` (`id`, `transport`, `best_time`, `safety`, `tips`, `updated_at`) VALUES
(1, 'Buses and minibuses from Kigali. Private hire available.', 'June-September (dry), March-May (green).', 'Rwanda is safe. General travel advice applies.', 'Carry water, sunscreen, local currency (RWF).', '2026-03-16 00:06:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accommodations`
--
ALTER TABLE `accommodations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `analytics`
--
ALTER TABLE `analytics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attractions`
--
ALTER TABLE `attractions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel_info`
--
ALTER TABLE `travel_info`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
