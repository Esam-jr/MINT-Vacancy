-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 06, 2024 at 08:17 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_vacancy`
--
CREATE DATABASE IF NOT EXISTS `employee_vacancy` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `employee_vacancy`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `username`, `password`, `email`, `role`) VALUES
(1, 'Imran4678', '$2b$10$Tqe33Szypn8jSclPI5lLCOywSogmTMKaSE4/8pzu.ykLOSkzCRzYq', 'noroomfor4678@gmail.com', 'admin'),
(2, 'abdu', '$2b$10$KPY.gayUJjGbspVzgMvO8.tLKjEZ0DgOqxwhYSGlcBOMFMCBIlU6u', 'abdulbari111@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `education_info`
--

CREATE TABLE `education_info` (
  `education_id` int(11) NOT NULL,
  `personal_id` int(11) NOT NULL,
  `degree_obtained` varchar(255) NOT NULL,
  `field_study` varchar(255) NOT NULL,
  `institution_name` varchar(255) NOT NULL,
  `graduation_date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `education_info`
--

INSERT INTO `education_info` (`education_id`, `personal_id`, `degree_obtained`, `field_study`, `institution_name`, `graduation_date`) VALUES
(4, 18, 'Degree', 'CS', 'HU', '2020-12-02'),
(5, 19, 'master', 'CS', 'HU', '2003-02-02'),
(6, 21, 'Degree', 'CS', 'HU', '2020-09-07'),
(7, 22, 'Degree', 'CS', 'HU', '2020-02-12'),
(8, 24, 'Degree', 'CS', 'HU', '2020-12-12'),
(9, 25, 'Degree', 'CS', 'HU', '2024-09-09'),
(10, 26, 'Degree', 'IT', 'Haramaya University', '2023-10-10'),
(11, 27, 'Degree', 'CS', 'Haramaya University', '2024-09-04'),
(12, 28, 'Degree', 'CS', 'Haramaya University', '2020-02-10'),
(13, 29, 'Degree', 'IT', 'Haramaya University', '2023-07-11');

-- --------------------------------------------------------

--
-- Table structure for table `job_announcement`
--

CREATE TABLE `job_announcement` (
  `job_id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `job_type` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `job_experience` varchar(255) NOT NULL,
  `job_salary` varchar(255) NOT NULL,
  `job_qualifications_skills` text NOT NULL,
  `job_description` text,
  `application_instructions` text NOT NULL,
  `deadline` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job_announcement`
--

INSERT INTO `job_announcement` (`job_id`, `job_title`, `job_type`, `location`, `job_experience`, `job_salary`, `job_qualifications_skills`, `job_description`, `application_instructions`, `deadline`) VALUES
(22, 'Marketing Manager', 'Full-Time', 'New York, NY', 'Mid-Level', '$90,000 - $120,000 per year', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, rem aspernatur atque harum modi incidunt quidem quis beatae et quasi explicabo iste repellendus voluptatem molestias. Ipsam, dolore. Accusantium, nemo laboriosam!', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, rem aspernatur atque harum modi incidunt quidem quis beatae et quasi explicabo iste repellendus voluptatem molestias. Ipsam, dolore. Accusantium, nemo laboriosam!', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, rem aspernatur atque harum modi incidunt quidem quis beatae et quasi explicabo iste repellendus voluptatem molestias. Ipsam, dolore. Accusantium, nemo laboriosam!', '2024-09-05T14:20:00.000Z'),
(23, 'Software Engineer', 'Full-Time', 'New York, NY', 'Mid-Level', '$90,000 - $120,000 per year', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', '2024-09-03T21:00:00.000Z'),
(24, 'Marketing Manager', 'Full-Time', 'New York, NY', 'Mid-Level', '$90,000 - $120,000 per year', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', '2024-12-12T09:00:00.000Z'),
(25, 'Data Analyst', 'Full-Time', 'remot', 'Senior-Level', '3000', 'hmcmhgh.k.vfhx,', 'esxgfgfhc', 'fxrgxdgxdfxffzz', '2024-09-04T11:04:00.000Z'),
(26, 'Full-Stack Web Developer', 'Full-Time', ' Remote', 'Senior-Level', '$90,000 - $120,000 per year', '- 3+ years in web development.\n- Bachelor\'s Degree in Computer Science or a related field is preferred.\n- Develop and maintain front-end architecture using React.js, Angular, or Vue.js.\n- Build and optimize back-end applications using Node.js, Express, and databases like MongoDB or MySQL.\n- Collaborate with cross-functional teams to deliver high-quality products.\n- Troubleshoot and debug issues across the full stack.\n- Ensure responsiveness of applications and implement best practices for scalability.\n- Write clean, maintainable, and efficient code following software development standards.\n- Proven experience as a Full-Stack Developer.\n- Strong knowledge of JavaScript, HTML, CSS, and front-end frameworks.\n- Proficiency in back-end technologies such as Node.js, Express, and database management (MySQL, MongoDB).\n- Familiarity with version control systems like Git.\n- Excellent communication skills and ability to work in a team.', ' XYZ Tech Solutions is seeking a talented Full-Stack Web Developer to join our dynamic team. The ideal candidate will be responsible for designing, developing, and maintaining both front-end and back-end web applications. You will collaborate with the design team to ensure seamless integration and an optimal user experience.', 'Send your resume and portfolio to careers@xyztechsolutions.com. Include “Full-Stack Developer” in the subject line of the email.\n- Competitive salary\n- Flexible working hours\n- Health and wellness programs\n- Learning and development opportunities', '2024-09-10T09:30:00.000Z'),
(27, 'Software Engineer', 'Full-Time', 'Addis Ababa, MintT', 'Entry-Level', '2000-4000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', '2024-09-07T07:06:00.000Z');

-- --------------------------------------------------------

--
-- Table structure for table `personal_info`
--

CREATE TABLE `personal_info` (
  `personal_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `date_of_birth` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `apply_for` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `personal_info`
--

INSERT INTO `personal_info` (`personal_id`, `first_name`, `last_name`, `email`, `phone_number`, `gender`, `date_of_birth`, `age`, `apply_for`) VALUES
(18, 'Imran', 'Mohammed', 'imranwebdevelop@gmail.com', '091232', 'Male', '2004-01-27T00:00:00.000Z', '20', 'Marketing Manager'),
(19, 'Isa', 'Dawd', 'imran.4678m@gmail.com', '091283217', 'Male', '2002-12-12T00:00:00.000Z', '21', 'Marketing Manager'),
(21, 'abdu', 'Mohammed', 'abdulbari111@gmail.com', '091232', 'Male', '2024-09-04T00:00:00.000Z', '0', 'Marketing Manager'),
(22, 'abdu', 'Mohammed', 'emranmohammed1919@gmail.com', '091232', 'Male', '2004-01-20T00:00:00.000Z', '20', 'Marketing Manager'),
(24, 'Imran', 'Mohammed', 'emranmohammed683@gmail.com', '091232', 'Male', '2020-10-02T00:00:00.000Z', '3', 'Marketing Manager'),
(25, 'Imran', 'Mohammedxc', 'imradxn.4678m@gmail.com', '0987654321', 'Male', '2024-09-17T00:00:00.000Z', '-1', 'Marketing Manager'),
(26, 'Natnael', 'Aklilu', 'nattii6756@gmail.com', '0967566385', 'Male', '2002-10-16T00:00:00.000Z', '21', 'Marketing Manager'),
(27, 'marta', 'abdu', 'marta12@gmail.com', '0912345678', 'Female', '2000-02-02T00:00:00.000Z', '24', 'Marketing Manager'),
(28, 'tebarek ', 'tessema', 'tebarektessema7p@gmail.com', '0965151122', 'Male', '2003-10-10T00:00:00.000Z', '20', 'Full-Stack Web Developer'),
(29, 'Abdulbari', 'Ibrahim', 'abdulbariibrahim111@gmail.com', '0912614549', 'Male', '2002-06-10T00:00:00.000Z', '22', 'Software Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `work_experience`
--

CREATE TABLE `work_experience` (
  `experience_id` int(11) NOT NULL,
  `personal_id` int(11) DEFAULT NULL,
  `job_title` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `start_date` varchar(255) NOT NULL,
  `end_date` varchar(255) NOT NULL,
  `experience_year` varchar(255) NOT NULL,
  `job_description` text,
  `cv` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `work_experience`
--

INSERT INTO `work_experience` (`experience_id`, `personal_id`, `job_title`, `company_name`, `start_date`, `end_date`, `experience_year`, `job_description`, `cv`) VALUES
(3, 18, 'Software Engineer', 'MINT', '2021-01-20', '2024-01-20', '2', 'lorem', 'uploads\\1725390105198-Revision Question.a1e0d2981aa09dc57ded.pdf'),
(4, 19, 'Software Engineer', 'MINT', '2003-09-23', '2024-09-09', '21', 'lorem', 'uploads\\1725437439066-Revision Question.a1e0d2981aa09dc57ded.pdf'),
(5, 21, 'Marketing Manager', 'Imranweddev.com', '2020-02-02', '2022-07-22', '2', 'hdja;faf', 'uploads\\1725439927659-hello.docx'),
(6, 22, 'Software Engineer', 'MINT', '2020-12-20', '2024-12-20', '4', 'Lorem', 'uploads\\1725440069996-Revision Question.a1e0d2981aa09dc57ded.pdf'),
(7, 24, 'Marketing Manager', 'MINT', '2021-10-10', '2024-10-10', '3', 'lorem', 'uploads\\1725440415635-Revision Question.a1e0d2981aa09dc57ded.pdf'),
(8, 25, 'Marketing Manager', 'MINT', '2024-09-25', '2024-09-11', '0', '', 'uploads\\1725445767906-hello.docx'),
(9, 26, 'Data Analyst', 'MINT', '2022-10-10', '2023-10-10', '1', 'Data analyst', 'uploads\\1725446886280-hello.docx'),
(10, 27, 'Marketing Manager', 'MINT', '2020-01-28', '2024-09-04', '4', 'gdyhhkf', 'uploads\\1725447331990-Revision Question.a1e0d2981aa09dc57ded.pdf'),
(11, 28, 'Data Analyst', 'ethio telecom', '2019-02-12', '2021-02-10', '2', ' Developed and maintained web applications, collaborated with cross-functional teams, and optimized system performance.', 'uploads\\1725608275810-Imranwebdev.com.pdf'),
(12, 29, 'Software Engineer', 'Imranweddev.com', '2020-02-02', '2022-02-02', '2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, sequi excepturi rem laboriosam quod dicta accusantium nam cumque hic corrupti, inventore consequatur delectus. Vero aut atque, cum enim accusantium accusamus.', 'uploads\\1725609182248-Imranwebdev.com.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `education_info`
--
ALTER TABLE `education_info`
  ADD PRIMARY KEY (`education_id`),
  ADD KEY `personal_id` (`personal_id`);

--
-- Indexes for table `job_announcement`
--
ALTER TABLE `job_announcement`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `personal_info`
--
ALTER TABLE `personal_info`
  ADD PRIMARY KEY (`personal_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `work_experience`
--
ALTER TABLE `work_experience`
  ADD PRIMARY KEY (`experience_id`),
  ADD KEY `personal_id` (`personal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `education_info`
--
ALTER TABLE `education_info`
  MODIFY `education_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `job_announcement`
--
ALTER TABLE `job_announcement`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `personal_info`
--
ALTER TABLE `personal_info`
  MODIFY `personal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `work_experience`
--
ALTER TABLE `work_experience`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `education_info`
--
ALTER TABLE `education_info`
  ADD CONSTRAINT `education_info_ibfk_1` FOREIGN KEY (`personal_id`) REFERENCES `personal_info` (`personal_id`);

--
-- Constraints for table `work_experience`
--
ALTER TABLE `work_experience`
  ADD CONSTRAINT `work_experience_ibfk_1` FOREIGN KEY (`personal_id`) REFERENCES `personal_info` (`personal_id`);
--
-- Database: `mydb`
--
CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mydb`;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `user_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_url` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_url`, `product_name`) VALUES
(1, 'iphone-15-pro', 'iPhone 15 Pro'),
(2, 'iphone-13', 'iPhone 13'),
(3, 'iphone-se', 'iPhone SE');

-- --------------------------------------------------------

--
-- Table structure for table `products_description`
--

CREATE TABLE `products_description` (
  `description_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_brief_description` varchar(500) DEFAULT NULL,
  `product_description` text,
  `product_img` varchar(1000) DEFAULT NULL,
  `product_link` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products_description`
--

INSERT INTO `products_description` (`description_id`, `product_id`, `product_brief_description`, `product_description`, `product_img`, `product_link`) VALUES
(1, 1, 'The ultimate iPhone.', 'iPhone 15 Pro is the first iPhone to feature an aerospace‑grade titanium design, using the same alloy that spacecraft use for missions to Mars.', 'https://www.apple.com/v/iphone/home/bv/images/overview/select/iphone_15_pro__bpnjhcrxofqu_xlarge.png', 'https://www.apple.com/us-edu/shop/buy-iphone/iphone-15-pro'),
(2, 2, 'All kinds of awesome.', 'iPhone 13 is the first iPhone to feature an aerospace‑grade titanium design, using the same alloy that spacecraft use for missions to Mars.', 'https://www.apple.com/v/iphone/home/bv/images/overview/select/iphone_13__gnwdyqfq7i2y_xlarge.png', 'https://www.apple.com/us-edu/shop/buy-iphone/iphone-13'),
(3, 3, 'Serious power. Serious value.', 'iPhone SE is the first iPhone to feature an aerospace‑grade titanium design, using the same alloy that spacecraft use for missions to Mars.', 'https://www.apple.com/v/iphone/home/bv/images/overview/select/iphone_se__gmvp19w01mum_xlarge.png', 'https://www.apple.com/us-edu/shop/buy-iphone/iphone-se');

-- --------------------------------------------------------

--
-- Table structure for table `product_price`
--

CREATE TABLE `product_price` (
  `price_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `starting_price` varchar(50) DEFAULT NULL,
  `price_range` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_price`
--

INSERT INTO `product_price` (`price_id`, `product_id`, `starting_price`, `price_range`) VALUES
(1, 1, '$999', 'From $999 or $41.62/mo. for 24 mo.*'),
(2, 2, '$599', 'From $599 or $24.95/mo. for 24 mo.*'),
(3, 3, '$429', 'From $429 or $17.87/mo. for 24 mo.*');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`) VALUES
(1, 'Imran', 'Imran '),
(2, 'Imran', 'Imran '),
(3, 'Imran', 'Imran ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `products_description`
--
ALTER TABLE `products_description`
  ADD PRIMARY KEY (`description_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_price`
--
ALTER TABLE `product_price`
  ADD PRIMARY KEY (`price_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products_description`
--
ALTER TABLE `products_description`
  MODIFY `description_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_price`
--
ALTER TABLE `product_price`
  MODIFY `price_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `products_description`
--
ALTER TABLE `products_description`
  ADD CONSTRAINT `products_description_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `product_price`
--
ALTER TABLE `product_price`
  ADD CONSTRAINT `product_price_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
--
-- Database: `mysqlexample-db`
--
CREATE DATABASE IF NOT EXISTS `mysqlexample-db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mysqlexample-db`;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `customer_id`, `address`) VALUES
(2, 5, 'AA'),
(3, 6, 'Adama'),
(4, 7, 'Harar'),
(5, 8, ''),
(6, 9, 'Adama');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `company` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id`, `customer_id`, `company`) VALUES
(2, 5, 'MIT'),
(3, 6, 'HU'),
(4, 7, 'AA'),
(5, 8, ''),
(6, 9, 'HU');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `name`) VALUES
(5, 'imran'),
(6, 'Abebe'),
(7, 'Almaz'),
(8, ''),
(9, 'imran');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
