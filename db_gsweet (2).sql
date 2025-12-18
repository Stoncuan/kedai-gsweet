-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2025 at 09:21 AM
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
-- Database: `db_gsweet`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_menu`
--

CREATE TABLE `tb_menu` (
  `id` int(11) NOT NULL,
  `nama_menu` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_menu`
--

INSERT INTO `tb_menu` (`id`, `nama_menu`, `harga`, `gambar`, `deskripsi`) VALUES
(2, 'Seblak', 25000, '1766023781996-seblak.jpg', 'Seblak komplit yang Bikin Lidah Bergoyang!'),
(3, 'Baso Aci', 25000, '1766026484700-BasoAci.jpg', 'Bakso Aci Kenyal, Rasanya Gurih, buat kamu ketagihan!'),
(4, 'Mie Jebew', 18000, '1766026594405-MieJebew.jpg', 'Mie Jebew, Rasanya Bikin Ketagihan!'),
(5, 'kebab', 20000, '1766032998536-Kebab.jpg', 'enak');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `no_tel` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `nama_lengkap`, `username`, `no_tel`, `email`, `password`) VALUES
(1, 'admin', 'admin', '085244209946', 'test@gmail.com', '$2b$10$oxPxeKZHg.xTPq6QyOpPY.IfVFn/pxdkE/fEP6r1DVQ3hSF0umwc6'),
(2, 'test', 'test', '123123', 'test@gmail.com', '$2b$10$2Rve0GVeK0ySPs.kdONVP.Z.YlJxAmHY4pWE/c7fzAWt5mVev6Jou'),
(3, 'Nona', 'Nona', '086545678', 'nona@gmail.com', '$2b$10$I.5cwubHsh5nG.s5vZ4wkObyutemO7FlHmwjrdsUEdX/yOQNMyAd6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_menu`
--
ALTER TABLE `tb_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_menu`
--
ALTER TABLE `tb_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
