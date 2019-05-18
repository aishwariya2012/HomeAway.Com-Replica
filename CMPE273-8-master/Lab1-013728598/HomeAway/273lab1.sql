-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 08:54 AM
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
-- Database: `273lab1`
--

-- --------------------------------------------------------

--
-- Table structure for table `listproperty`
--

CREATE TABLE `listproperty` (
  `PropertyID` int(10) NOT NULL,
  `UserName` varchar(30) NOT NULL,
  `TravellerName` varchar(20) DEFAULT NULL,
  `Booking` varchar(20) DEFAULT NULL,
  `AddressL1` varchar(20) NOT NULL,
  `AddressL2` varchar(20) NOT NULL,
  `City` varchar(20) NOT NULL,
  `Country` varchar(20) NOT NULL,
  `ZipCode` int(10) NOT NULL,
  `HeadLine` varchar(100) NOT NULL,
  `Description` varchar(10000) NOT NULL,
  `PropertyType` varchar(20) NOT NULL,
  `BedRoom` int(10) NOT NULL,
  `Accomodates` int(10) NOT NULL,
  `BathRoom` int(10) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Currency` varchar(10) NOT NULL,
  `RentalRates` int(10) NOT NULL,
  `Night` int(10) NOT NULL,
  `ImageNames` varchar(1000) NOT NULL,
  `Cost` int(11) DEFAULT NULL,
  `Start` date DEFAULT NULL,
  `End` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listproperty`
--

INSERT INTO `listproperty` (`PropertyID`, `UserName`, `TravellerName`, `Booking`, `AddressL1`, `AddressL2`, `City`, `Country`, `ZipCode`, `HeadLine`, `Description`, `PropertyType`, `BedRoom`, `Accomodates`, `BathRoom`, `StartDate`, `EndDate`, `Currency`, `RentalRates`, `Night`, `ImageNames`, `Cost`, `Start`, `End`) VALUES
(1, 'admin', 'admin', '0', '868 S 5th St', '#215', 'San Jose', 'US', 95112, 'Welcome to the best place in san jose', 'It has the most beautiful amenities', 'apartment', 3, 6, 3, '2018-10-02', '2018-10-31', 'USD', 300, 1, 'download.png,download (1).jpg', NULL, '2018-10-09', '2018-10-11'),
(6, 'admin@gmail.com', 'naina', '1', 'sdfd', 'sdfg', 'San Jose', 'we', 45, 'srt', 'erty', 'estate', 3, 4, 2, '2018-10-06', '2018-10-26', 'USD', 150, 2, 'download (2).jpg', NULL, '2018-10-09', '2018-10-11'),
(7, 'admin', 'admin', '1', 'XYZ', 'sg', 'San Jose', 'US', 95112, 'Hello', 'sdfg', 'hostel', 4, 5, 7, '2018-10-04', '2018-10-13', 'USD', 200, 3, 'download (3).jpg', NULL, '2018-10-10', '2018-10-12'),
(8, 'nains@gmail.com', 'admin@gmail.com', '1', '869 S 5th St', '#215', 'San Jose', 'US', 95112, 'Foundry Commons', 'Live like a place at home.', 'apartment', 3, 7, 2, '2018-10-09', '2018-11-07', 'USD', 100, 2, 'Foundry1.jpg,Foundry2.jpg,Foundry3.jpg,Foundry4.jpg', NULL, '2018-10-10', '2018-10-17'),
(9, 'shahr@gmail.com', NULL, '0', '1300 The Alameda', 'Avalon', 'San Jose', 'Us', 95216, 'Avalon Almeda', 'Hey there! Welcome to the Avalon, Heavenly home', 'hostel', 4, 10, 3, '2018-10-09', '2018-10-17', 'USD', 200, 1, 'Avalon.jpg,Avalon1.jpg,Avalon2.jpg,Avalon3.jpg', NULL, NULL, NULL),
(10, 'shahr@gmail.com', NULL, '0', '101 E San Fernando S', '#101', 'New York', 'US', 95112, '101 San Fernando', 'Welcome to Our Place. The place nearer to San Jose State', 'apartment', 4, 12, 3, '2018-10-02', '2018-10-25', 'USD', 100, 2, '101-1.jpg,101-2.jpg,101-3.jpg', NULL, NULL, NULL),
(11, 'shahr@gmail.com', NULL, '0', '201 S 4th St', '#100', 'Chicago', 'US', 23456, 'Colonade', 'Welcome to Colonade, The Colonnade Apartments in Downtown San Jose offer the perfect blend of comfort & convenience in a cosmopolitan setting. Call to schedule your tour today!', 'bungalow', 3, 10, 2, '2018-10-02', '2018-10-27', 'USD', 200, 2, 'colonade1.jpg,colonade2.jpg,colonade3.jpg,colonade4.jpg,colonade5.jpg', NULL, NULL, NULL),
(12, 'james@gmail.com', NULL, '0', '190 Ryland Street', '#2111', 'Dallas', 'US', 94234, 'Fountain Plaza', 'Fountain Plaza the world of Fountains. Come and see by yourself!!!', 'farmhouse', 6, 20, 4, '2018-11-06', '2018-10-19', 'USD', 150, 2, 'Fountain1.jpg,Fountain2.jpg,Fountain3.jpg', NULL, NULL, NULL),
(13, 'james@gmail.com', NULL, '0', '190 Ryland St 12', '#56', 'Chicago', 'US', 345, 'Legacy Plaza', 'Most welcome to Legacy', 'apartment', 2, 6, 2, '2018-10-03', '2018-10-13', 'USD', 12, 1, 'legacy.jpg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `PasswordEncrypt` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`FirstName`, `LastName`, `UserName`, `Password`, `PasswordEncrypt`) VALUES
('Aaliya', 'Bhatt', 'aaliya@gmail.com', 'aaliya', '$2a$10$anaIm53ByUAxAmv5dKNG5O9RyaPyr1NFyATB55HO9inZl1EzjJJ5S'),
('Aisha', 'Joshi', 'admin', 'admin', '$2a$10$kvJlsriNeCOd.9AKAcEloOat2KINQAOMN0hlXQ8U7HhO0JYo0/Pzy'),
('Aishwariya', 'Bhatt', 'admin@gmail.com', 'admin', '$2a$10$F7jRY.Dgy079ZF4yFRTsMuFWRmIAewLzduS1tDVBAdh2A.A0DyBNi'),
('Robert', 'Clark', 'clark@gmail.com', 'clark', '$2a$10$THHeX7PYQC4Bz.rEM12rp.omkYZxVYP/QTj/CXMnhHPnv5tii9ENC'),
('James', 'Steve', 'james@gmail.com', 'james', '$2a$10$psO9sTOukeL.J9BdPb83re2h5MbRhpGzaHiMLOJyqxCif5Lu.27Xq'),
('Naina', 'Singh', 'nains@gmail.com', 'naina', '$2a$10$jRSI/e8Wol/WkJNVCPqKp.qmiUiqQqyaneLRjqkyXZzoI2vpur8IO'),
('Ruhi', 'Shah', 'shahr@gmail.com', 'rushishah', '$2a$10$Ybw3ISkH0Zd/prEBNgiw9.h1d4K0/XvNGo66kFefNc4uP2LjmqUHG');

-- --------------------------------------------------------

--
-- Table structure for table `userinfo2`
--

CREATE TABLE `userinfo2` (
  `FirstName` varchar(20) NOT NULL,
  `LastName` varchar(20) NOT NULL,
  `AboutMe` varchar(200) DEFAULT NULL,
  `City` varchar(20) DEFAULT NULL,
  `Company` varchar(20) DEFAULT NULL,
  `School` varchar(20) DEFAULT NULL,
  `Hometown` varchar(20) DEFAULT NULL,
  `Languages` varchar(20) DEFAULT NULL,
  `Gender` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userinfo2`
--

INSERT INTO `userinfo2` (`FirstName`, `LastName`, `AboutMe`, `City`, `Company`, `School`, `Hometown`, `Languages`, `Gender`) VALUES
('Aaliya', 'Bhatt', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Aisha', 'Joshi', 'Fun person', NULL, NULL, NULL, NULL, NULL, NULL),
('Aishwariya', 'Bhatt', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('James', 'Steve', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Naina', 'Singh', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Robert', 'Clark', 'Fun Loving Person', 'San Jose, US', NULL, NULL, NULL, 'English', 'Male'),
('Ruhi', 'Shah', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `listproperty`
--
ALTER TABLE `listproperty`
  ADD PRIMARY KEY (`PropertyID`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`UserName`);

--
-- Indexes for table `userinfo2`
--
ALTER TABLE `userinfo2`
  ADD PRIMARY KEY (`FirstName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `listproperty`
--
ALTER TABLE `listproperty`
  MODIFY `PropertyID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
