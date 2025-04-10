-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 06:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `technoclash`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `challenge_problems`
--

CREATE TABLE `challenge_problems` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `difficulty` varchar(255) NOT NULL DEFAULT 'easy',
  `constraints` text DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `challenge_problems`
--

INSERT INTO `challenge_problems` (`id`, `user_id`, `title`, `description`, `difficulty`, `constraints`, `tags`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 'Palindrome Check', 'Write a program that takes a string as input and outputs \"yes\" if the string is a palindrome (reads the same forward and backward, case-insensitive), and \"no\" otherwise.', 'easy', '1 <= string length <= 1000\nThe string contains only alphanumeric characters.', '[\"string\",\"logic\"]', 'active', '2025-04-09 17:17:30', '2025-04-09 20:51:57'),
(3, 1, 'Reverse String', 'Write a program that takes a string as input and outputs the string with its characters reversed.', 'easy', '1 <= string length <= 1000\nThe string contains only printable ASCII characters.', '[\"string\",\"basic\"]', 'active', '2025-04-09 17:19:53', '2025-04-09 20:52:12'),
(4, 1, 'Vowel Count', 'Write a program that takes a string as input and outputs the number of vowels (a, e, i, o, u) in the string, case-insensitive.', 'medium', '1 <= string length <= 1000\nThe string contains only printable ASCII characters.', '[\"string\",\"counting\"]', 'active', '2025-04-09 18:28:27', '2025-04-09 20:52:34'),
(5, 1, 'Remove Duplicates', 'Write a program that takes a string as input and outputs the string with all duplicate characters removed, preserving the order of first appearance.', 'medium', '1 <= string length <= 1000\nThe string contains only printable ASCII characters.', '[\"string\",\"set\"]', 'active', '2025-04-09 18:29:16', '2025-04-09 20:52:49'),
(6, 1, 'Remove Duplicates from List', 'Write a program that takes a list of integers as input and outputs the list with duplicates removed, preserving the order of first appearance, as a string in the same format.', 'medium', '1 <= list length <= 100\nEach integer is between -1000 and 1000.', '[\"list\",\"set\"]', 'active', '2025-04-09 18:36:34', '2025-04-09 20:53:17');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(19, '0001_01_01_000000_create_users_table', 1),
(20, '0001_01_01_000001_create_cache_table', 1),
(21, '0001_01_01_000002_create_jobs_table', 1),
(22, '2025_03_28_100045_create_personal_access_tokens_table', 1),
(23, '2025_03_29_100412_create_user_profiles', 1),
(24, '2025_03_30_092229_add_verification_code_to_users_table', 2),
(27, '2025_04_09_115057_create_challenge_problems_table', 3),
(28, '2025_04_09_121531_create_test_cases_table', 4),
(29, '2025_04_09_182130_create_submissions_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'authToken', '99304007bc1be7728de3e5527703bae753ec0cf4fe1350446f794b1927ef9dbe', '[\"*\"]', NULL, NULL, '2025-03-29 04:34:10', '2025-03-29 04:34:10'),
(2, 'App\\Models\\User', 1, 'authToken', '3a602004e566645c4dec26c17894d13675ac7422e7a6ca9da3d16232b2232204', '[\"*\"]', NULL, NULL, '2025-03-29 04:34:54', '2025-03-29 04:34:54'),
(3, 'App\\Models\\User', 1, 'authToken', '558ea9679dfb2ed5da039500e0bf93e0f2a195204949d77704decafd605b35d2', '[\"*\"]', NULL, NULL, '2025-03-29 04:35:30', '2025-03-29 04:35:30'),
(4, 'App\\Models\\User', 1, 'authToken', 'ce8e0df672ec536ea48ed2127f593e45e713d7f370b37e11277df8f051fdea31', '[\"*\"]', NULL, NULL, '2025-03-29 04:36:41', '2025-03-29 04:36:41'),
(5, 'App\\Models\\User', 1, 'authToken', '166943d40d9c4fa2c22a4f16f2aaf1132714dcedefedef5f1a0151a05eea73e2', '[\"*\"]', NULL, NULL, '2025-03-29 04:40:04', '2025-03-29 04:40:04'),
(6, 'App\\Models\\User', 1, 'authToken', 'bf1cbaf31339f9bf1869bf6e071a31a53f194265fc7b68c7f1fe1eb867ec839a', '[\"*\"]', NULL, NULL, '2025-03-29 04:41:19', '2025-03-29 04:41:19'),
(7, 'App\\Models\\User', 1, 'authToken', '67e54df2fb05c8607f2eada22780953e39ff5cd05c96b6ea5cb1d1a2d2354e9a', '[\"*\"]', '2025-03-29 05:04:06', NULL, '2025-03-29 04:44:01', '2025-03-29 05:04:06'),
(8, 'App\\Models\\User', 1, 'authToken', '3cf51577b43207ffcd850cbf8cf2546221ca37719959e25fb4cf12426bfea400', '[\"*\"]', '2025-03-29 05:08:41', NULL, '2025-03-29 05:05:32', '2025-03-29 05:08:41'),
(9, 'App\\Models\\User', 1, 'authToken', '508bdbbccc654f206e7a346323eb97d3f148d2b7f0e457f236a662e0a957cb33', '[\"*\"]', '2025-03-29 05:14:57', NULL, '2025-03-29 05:11:49', '2025-03-29 05:14:57'),
(10, 'App\\Models\\User', 1, 'authToken', '7a4b6dd6792313a686bc75299e9f14e59f677fadf8e0baebd208dc630b380196', '[\"*\"]', '2025-03-29 05:18:55', NULL, '2025-03-29 05:15:19', '2025-03-29 05:18:55'),
(11, 'App\\Models\\User', 1, 'authToken', '6d1495109626083168ed50774f888f6d44b60ea0dc8e9f6861e2995726c51eb2', '[\"*\"]', '2025-03-29 21:40:26', NULL, '2025-03-29 05:19:22', '2025-03-29 21:40:26'),
(13, 'App\\Models\\User', 2, 'authToken', '37e3b7d7d9006ef3e240a4ee69427ddd01a6c6fdb2894c4ad13962b80f975cfa', '[\"*\"]', NULL, NULL, '2025-03-30 01:28:20', '2025-03-30 01:28:20'),
(24, 'App\\Models\\User', 2, 'authToken', '8c437519a01d1e3e03c475a7d92a6d98148a3dfe3fe2f128b48dd5f9b7bce305', '[\"*\"]', '2025-04-09 06:50:09', NULL, '2025-04-09 05:27:06', '2025-04-09 06:50:09'),
(31, 'App\\Models\\User', 2, 'authToken', '271f424ac631f9b9f02548dfdaeba735d91cfa95e01e3ba90b3c33fbad8e6317', '[\"*\"]', NULL, NULL, '2025-04-09 07:03:53', '2025-04-09 07:03:53'),
(32, 'App\\Models\\User', 2, 'authToken', '0654f4cc5c13c55426775bde92a0f40966e39a2087e2de1d72e7a3fc6793f6e3', '[\"*\"]', NULL, NULL, '2025-04-09 07:04:06', '2025-04-09 07:04:06'),
(33, 'App\\Models\\User', 2, 'authToken', 'f844185c39ceffc6fb19f2edb07455955936af32796544f5eb1e02eacf550c44', '[\"*\"]', NULL, NULL, '2025-04-09 07:04:24', '2025-04-09 07:04:24'),
(34, 'App\\Models\\User', 2, 'authToken', 'd7c7af1164dcb29cac7c8c16f23f5152a8f921eae856fad998f245942fa21d29', '[\"*\"]', NULL, NULL, '2025-04-09 07:04:25', '2025-04-09 07:04:25'),
(35, 'App\\Models\\User', 2, 'authToken', '16a923e463d1f5f1d959635e58a9173d768f03fd6ebceb377bfa70de8f096251', '[\"*\"]', NULL, NULL, '2025-04-09 07:04:43', '2025-04-09 07:04:43'),
(36, 'App\\Models\\User', 2, 'authToken', '9562165099afc07dc32c6e0ce9ac8985fc01617bc39f4eb6f3dff9a5c8fea5a6', '[\"*\"]', NULL, NULL, '2025-04-09 07:05:48', '2025-04-09 07:05:48'),
(53, 'App\\Models\\User', 1, 'authToken', 'c1706e8deea4a51a6a05f6c035814c11bd926d84fecac883bb51543fcfbc4d2b', '[\"*\"]', '2025-04-09 20:57:14', NULL, '2025-04-09 20:53:51', '2025-04-09 20:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('qCUkzVGTwAFo3uIfa72Ue8uUIMNYdJdZtO5rcsSh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNlNOSEQ2ZnZYU0RhWXVvYnk2V0JPUGVrN01URnowd0l4WkJzQ0N3RSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdy5qcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1744260943);

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `challenge_problem_id` bigint(20) UNSIGNED NOT NULL,
  `language_id` int(11) NOT NULL,
  `source_code` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `stdout` text DEFAULT NULL,
  `stderr` text DEFAULT NULL,
  `execution_time` double DEFAULT NULL,
  `memory_used` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `user_id`, `challenge_problem_id`, `language_id`, `source_code`, `status`, `stdout`, `stderr`, `execution_time`, `memory_used`, `created_at`, `updated_at`) VALUES
(6, 1, 3, 71, '# Python Language\r\n\r\nstring = input()\r\n\r\nprint(string[::-1])', 'Accepted', 'olleh\n\nhannaH', NULL, 0.008, 3320, '2025-04-09 18:20:28', '2025-04-09 18:20:28'),
(7, 1, 2, 71, '# Python Language\r\n\r\norig = input()\r\n\r\nif orig == orig[::-1]:\r\n    print(\'yes\')\r\nelse:\r\n    print(\'no\')', 'Accepted', 'yes\n\nno', NULL, 0.008, 3380, '2025-04-09 20:57:14', '2025-04-09 20:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `test_cases`
--

CREATE TABLE `test_cases` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `challenge_problem_id` bigint(20) UNSIGNED NOT NULL,
  `input` text NOT NULL,
  `expected_output` text NOT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `test_cases`
--

INSERT INTO `test_cases` (`id`, `challenge_problem_id`, `input`, `expected_output`, `is_sample`, `created_at`, `updated_at`) VALUES
(23, 2, 'racecar', 'yes', 1, '2025-04-09 20:51:57', '2025-04-09 20:51:57'),
(24, 2, 'hello', 'no', 0, '2025-04-09 20:51:57', '2025-04-09 20:51:57'),
(25, 3, 'hello', 'olleh', 1, '2025-04-09 20:52:12', '2025-04-09 20:52:12'),
(26, 3, 'world', 'dlrow', 0, '2025-04-09 20:52:12', '2025-04-09 20:52:12'),
(27, 4, 'hello', '2', 1, '2025-04-09 20:52:34', '2025-04-09 20:52:34'),
(28, 4, 'WORLD', '1', 0, '2025-04-09 20:52:34', '2025-04-09 20:52:34'),
(29, 5, 'hello', 'helo', 1, '2025-04-09 20:52:49', '2025-04-09 20:52:49'),
(30, 5, 'aabbcc', 'abc', 0, '2025-04-09 20:52:49', '2025-04-09 20:52:49'),
(31, 6, '1 2 3 3', '[1, 2, 3]', 1, '2025-04-09 20:53:17', '2025-04-09 20:53:17'),
(32, 6, '5 5 5 1', '[5, 1]', 0, '2025-04-09 20:53:17', '2025-04-09 20:53:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'student',
  `status` enum('Activated','Deactivated') NOT NULL,
  `registration_progress` enum('credentials','information','completed') NOT NULL DEFAULT 'credentials',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `verification_code_expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verified_at`, `password`, `role`, `status`, `registration_progress`, `remember_token`, `created_at`, `updated_at`, `verification_code`, `verification_code_expires_at`) VALUES
(1, 'edgardollentas2004@gmail.com', '2025-04-06 07:18:54', '$2y$12$jF0dhtYRm3A3Yz0k3qnrD.u2P6eqbIhkXs44CI9zgT5Qv54Q1/BDy', 'student', 'Activated', 'completed', NULL, '2025-03-29 12:14:49', '2025-04-09 03:18:22', NULL, NULL),
(2, 'hatschiyo@gmail.com', '2025-03-30 08:06:27', '$2y$12$I66IsHMZNCjrXsU3rAQyxew8l4y4vKKZ7A70dGDnZjqLMa/abU/he', 'student', 'Activated', 'completed', NULL, '2025-03-30 00:13:49', '2025-03-30 08:06:27', NULL, NULL),
(6, 'chihatsu0@gmail.com', '2025-04-09 02:18:08', '$2y$12$GtV6VlaGHMhV.YfVo1VVIe46lRHWAlbWtgsfr3eo0rywOXmjeRsVe', 'student', 'Activated', 'completed', NULL, '2025-04-09 02:18:08', '2025-04-09 02:18:08', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `win_streak` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`id`, `user_id`, `first_name`, `last_name`, `username`, `gender`, `avatar`, `bio`, `university`, `points`, `win_streak`, `created_at`, `updated_at`) VALUES
(1, 1, 'Edgar', 'Dollentas', 'gahrie', 'female', NULL, NULL, '', 0, 0, NULL, '2025-04-09 03:15:22'),
(2, 6, 'Edgar', 'Dollentas', 'gary', 'male', 'default-avatar.png', NULL, NULL, 1000, 0, '2025-04-09 02:18:08', '2025-04-09 02:18:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `challenge_problems`
--
ALTER TABLE `challenge_problems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenge_problems_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submissions_user_id_foreign` (`user_id`),
  ADD KEY `submissions_challenge_problem_id_foreign` (`challenge_problem_id`);

--
-- Indexes for table `test_cases`
--
ALTER TABLE `test_cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_cases_challenge_problem_id_foreign` (`challenge_problem_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_profiles_username_unique` (`username`),
  ADD KEY `user_profiles_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `challenge_problems`
--
ALTER TABLE `challenge_problems`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `test_cases`
--
ALTER TABLE `test_cases`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `challenge_problems`
--
ALTER TABLE `challenge_problems`
  ADD CONSTRAINT `challenge_problems_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_challenge_problem_id_foreign` FOREIGN KEY (`challenge_problem_id`) REFERENCES `challenge_problems` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `submissions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `test_cases`
--
ALTER TABLE `test_cases`
  ADD CONSTRAINT `test_cases_challenge_problem_id_foreign` FOREIGN KEY (`challenge_problem_id`) REFERENCES `challenge_problems` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
