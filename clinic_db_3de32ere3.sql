-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2019 at 06:33 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinic_db_3de32ere3`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments_3sd3df`
--

CREATE TABLE `appointments_3sd3df` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `specialty` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `date` datetime NOT NULL,
  `isBy` int(11) NOT NULL,
  `added_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Dumping data for table `appointments_3sd3df`
--

INSERT INTO `appointments_3sd3df` (`id`, `doctor_id`, `clinic_id`, `patient_id`, `specialty`, `comment`, `date`, `isBy`, `added_by`) VALUES
(3, 3, 1, 1, 'gynecology and infertility', 'sdsa', '2019-01-01 07:40:00', 0, 3),
(5, 3, 1, 1, 'dentistry (teeth)', 'cvv', '2019-01-01 00:20:00', 0, 3),
(6, 3, 1, 1, 'dermatology (skin)', 'cc', '2019-04-16 00:20:00', 0, 3),
(7, 3, 1, 1, 'dentistry (teeth)', 'cc', '2019-04-16 00:20:00', 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `clinics`
--

CREATE TABLE `clinics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `location` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `about` text COLLATE utf8_swedish_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Dumping data for table `clinics`
--

INSERT INTO `clinics` (`id`, `name`, `address`, `location`, `about`, `phone`) VALUES
(1, 'clinic', 'dammam,road df , 2034', '3434432', 'So by colonel hearted ferrars. Draw from upon here gone add one. He in sportsman household otherwise it perceived instantly. Is inquiry no he several excited am. Called though excuse length ye needed it he having. Whatever throwing we on resolved entrance together graceful. Mrs assured add private married removed believe did she.', '0551214585');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_12fdrv`
--

CREATE TABLE `doctors_12fdrv` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `specialty` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `nationality` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `birth_date` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `gender` varchar(6) COLLATE utf8_swedish_ci NOT NULL,
  `added_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Dumping data for table `doctors_12fdrv`
--

INSERT INTO `doctors_12fdrv` (`id`, `user_id`, `specialty`, `address`, `nationality`, `birth_date`, `gender`, `added_by`) VALUES
(3, 141, 'dentist', 'dammam', 'Saudi', '98/1/3', 'male', 3),
(4, 142, 'dentist', 'dammam', 'Saudi', '98/1/3', 'male', 3),
(5, 143, 'dentist', 'dammam', 'Saudi', '98/1/3', 'male', 3),
(6, 144, 'dentist', 'dammam', 'Saudi', '98/1/3', 'male', 3),
(7, 145, 'dentist', 'dammam', 'Saudi', '98/1/3', 'male', 3),
(8, 146, 'dentist', 'dammam', 'Saudi', '98/1/3', 'female', 3);

-- --------------------------------------------------------

--
-- Table structure for table `patients_j45bsc`
--

CREATE TABLE `patients_j45bsc` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `birth_date` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `nationality` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `added_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Dumping data for table `patients_j45bsc`
--

INSERT INTO `patients_j45bsc` (`id`, `fname`, `lname`, `email`, `clinic_id`, `birth_date`, `nationality`, `phone`, `added_by`) VALUES
(1, 'ahmed', 'raed', 'dsad', 1, 'asd', 'dsad', '', 3),
(4, 'khalid', 'rami', 'mail45', 1, '2000/8/25', 'saudi', '', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users_2er31`
--

CREATE TABLE `users_2er31` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `phone` varchar(255) COLLATE utf8_swedish_ci NOT NULL,
  `added_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Dumping data for table `users_2er31`
--

INSERT INTO `users_2er31` (`id`, `fname`, `lname`, `role`, `email`, `password`, `clinic_id`, `phone`, `added_by`) VALUES
(1, 'khalid', 'ahmed', 1, 'jkhk', '', 1, '', 0),
(2, 'df', 'df', 1, 'dsf', '$2b$10$Zza.YtavspT114ttasjMZeQXpd2MR4t9U6zZqv6Sc/UyYteTwCeyW', 1, '', 0),
(3, 'dd', 'ss', 1, 'mail', '$2b$10$XhuAohnGBLvU9w1fv49Kge39b21LfTCsn7B2pCUJXGJWI8DVMstCy', 1, '', 0),
(7, 'sami', 'ahmed', 2, 'mail1', '$2b$10$AHsV4cjHQMMQePtFdm5A9.VVifeZgmG0cC6Ccrz7rJXpX54010ByG', 1, '', 0),
(141, 'ahmed ', 'mostfa', 4, 'mail0', '$2b$10$LD.tLqHqM73ivX/AfczY9eUBBuzf2oce3HovUCz.4OjcwGtYT2/GC', 1, '', 0),
(142, 'rajeh', 'khalid', 4, 'mail00', '$2b$10$wlHE6Y6wKYL5iF0ikEHHPeLruz6F/JLH.gW.7sJsP6LFUfKP4AZxe', 1, '', 0),
(143, 'adel', 'khalid', 4, 'mail01', '$2b$10$zuHQb6dxW0UmzKoGrNGgA.t792/tL19wbN1MucvnP60S5hBi3wMdS', 1, '', 0),
(144, 'adel', 'sami', 4, 'mail11', '$2b$10$K6Jfx6Dm6bvj1Qq/NDg3Le7n1zBRWrBTE7DZvR74ZDsXsX8vk9HXG', 1, '', 0),
(145, 'raed', 'samer', 4, 'mail12', '$2b$10$e6Yz.aGUPk.2c.MFzX51IOXuvprd2NPagTedG3ZjFj2jvBMkevOhe', 1, '', 0),
(146, 'soad', 'saud', 4, 'mail22', '$2b$10$9nELjMWUWE4cJcYn9EM2X.NUlnvFDGJLqU6E8TBWZD3OYQg41Yv.u', 1, '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments_3sd3df`
--
ALTER TABLE `appointments_3sd3df`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_clinic_id` (`clinic_id`),
  ADD KEY `app_user_id` (`added_by`),
  ADD KEY `app_pat_id` (`patient_id`),
  ADD KEY `app_doctor_id` (`doctor_id`);

--
-- Indexes for table `clinics`
--
ALTER TABLE `clinics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors_12fdrv`
--
ALTER TABLE `doctors_12fdrv`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `patients_j45bsc`
--
ALTER TABLE `patients_j45bsc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `pat_clinic_id` (`clinic_id`),
  ADD KEY `ap_user_id` (`added_by`);

--
-- Indexes for table `users_2er31`
--
ALTER TABLE `users_2er31`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `clinic_id` (`clinic_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments_3sd3df`
--
ALTER TABLE `appointments_3sd3df`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `clinics`
--
ALTER TABLE `clinics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctors_12fdrv`
--
ALTER TABLE `doctors_12fdrv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `patients_j45bsc`
--
ALTER TABLE `patients_j45bsc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users_2er31`
--
ALTER TABLE `users_2er31`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments_3sd3df`
--
ALTER TABLE `appointments_3sd3df`
  ADD CONSTRAINT `app_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `app_doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctors_12fdrv` (`id`),
  ADD CONSTRAINT `app_user_id` FOREIGN KEY (`added_by`) REFERENCES `users_2er31` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `doctors_12fdrv`
--
ALTER TABLE `doctors_12fdrv`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users_2er31` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patients_j45bsc`
--
ALTER TABLE `patients_j45bsc`
  ADD CONSTRAINT `ap_user_id` FOREIGN KEY (`added_by`) REFERENCES `users_2er31` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pat_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_2er31`
--
ALTER TABLE `users_2er31`
  ADD CONSTRAINT `clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
