-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2024 at 06:36 PM
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
-- Database: `flask_auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'dasda', 'dasda@g.c', '$2b$12$CXuMjZFuRs5wfbLfEihJMub.rnlBkckmiDSJG/vbb6paYYA1HDWqi', '2024-11-14 17:14:05'),
(2, 'krishna', 'nksh@nsds.com', '$2b$12$nd56Azlgan2lvWYTMAkGneXgff6eiGYQH3OZ04TkRcQp8VEKgTCD6', '2024-11-14 17:16:51'),
(3, 'dadsa', 'sdsa@gmai.com', '$2b$12$Iz84AAeD98bwah9SOw8Hueqgk.xsieEfiueDwp0LvQg5XqqePu/IK', '2024-11-14 17:17:28'),
(4, 'krishna', 'sdada@gmail.com', '$2b$12$O27WE//kl4z4HfpA7/bPSe6t.lpjhIGCZ4okhUK14OVvA6lTOKfDa', '2024-11-14 17:20:04'),
(5, 'krishna', 'nksh@1nsds.com', '$2b$12$lAP2DuGwJrXelqeqPZNNxu77rfWxKnkOT7cJ7WgS8KyTgJodlmIcC', '2024-11-14 17:24:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
