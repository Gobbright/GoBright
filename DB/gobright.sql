-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2026 at 01:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gobright`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `display_name` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password_hash`, `display_name`, `created_at`) VALUES
(1, 'gobright_admin', '$2y$10$.1xkxQK0IizaGKJwSONsW.kWKtZFt7YT.HgLaOkD198b0GccpbYN6', 'Website Admin', '2026-07-11 05:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `career_applications`
--

CREATE TABLE `career_applications` (
  `id` int(10) UNSIGNED NOT NULL,
  `job_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(190) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `email` varchar(190) NOT NULL,
  `position` varchar(190) NOT NULL,
  `experience` varchar(120) NOT NULL DEFAULT '',
  `portfolio_url` varchar(255) NOT NULL DEFAULT '',
  `resume_path` varchar(255) NOT NULL DEFAULT '',
  `resume_name` varchar(255) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `source_page` varchar(255) NOT NULL DEFAULT '',
  `extra_data` text DEFAULT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `career_applications`
--

INSERT INTO `career_applications` (`id`, `job_id`, `name`, `phone`, `email`, `position`, `experience`, `portfolio_url`, `resume_path`, `resume_name`, `message`, `source_page`, `extra_data`, `status`, `created_at`) VALUES
(1, NULL, 'Demo Applicant One', '9000000001', 'candidate1@example.com', 'Digital Marketing Executive', '2 years', '', '', '', 'Available to join in 30 days.', '', NULL, 'new', '2026-07-11 05:58:18'),
(2, NULL, 'Demo Applicant Two', '9000000002', 'candidate2@example.com', 'Graphic Designer', '1 year', 'https://example.com/portfolio', '', '', 'Portfolio shared for review.', '', NULL, 'shortlisted', '2026-07-11 05:58:18'),
(3, NULL, 'Demo Applicant Three', '9000000003', 'candidate3@example.com', 'PHP Developer', '3 years', 'https://github.com/example', '', '', 'Experienced with PHP and SQLite.', '', NULL, 'new', '2026-07-11 05:58:18'),
(4, NULL, 'Demo Applicant Four', '9000000004', 'candidate4@example.com', 'Content Writer', 'Fresher', '', '', '', 'Interested in brand content.', '', NULL, 'shortlisted', '2026-07-11 05:58:18'),
(5, NULL, 'Demo Applicant Five', '9000000005', 'candidate5@example.com', 'Video Editor', '1 year', 'https://example.com/reel', '', '', 'Reel available at the link.', '', NULL, 'shortlisted', '2026-07-11 05:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(190) NOT NULL,
  `image` longtext NOT NULL,
  `website` varchar(255) NOT NULL DEFAULT '',
  `status` varchar(30) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `image`, `website`, `status`, `created_at`) VALUES
(24, 'Sri Venkateswara Textiles', 'assets/img/clients/sri-venkateswara-textiles-logo.webp', '', 'active', '2026-07-13 01:00:07'),
(25, 'Kwik eCabs', 'assets/img/clients/kwik-ecabs-logo.webp', '', 'active', '2026-07-13 01:00:07'),
(26, 'Ivory Code', 'assets/img/clients/ivory-code-logo.webp', '', 'active', '2026-07-13 01:00:07'),
(27, 'Kurunchi Holiday', 'assets/img/clients/kurunchi-holiday-logo.webp', '', 'active', '2026-07-13 01:00:07'),
(28, 'Prana Rehabilitation Centre', 'assets/img/clients/prana-rehabilitation-centre-logo.webp', '', 'active', '2026-07-13 01:00:07');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(10) UNSIGNED NOT NULL,
  `employee_code` varchar(60) NOT NULL,
  `name` varchar(190) NOT NULL,
  `role` varchar(190) NOT NULL,
  `expertise` varchar(255) NOT NULL DEFAULT '',
  `photo` longtext NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_code`, `name`, `role`, `expertise`, `photo`, `status`, `created_at`) VALUES
(6, 'GB2026001', 'Mr. Thanga Durai', 'Managing Director (MD)', 'Business strategy and brand growth', 'assets/img/teams/mr-thanga-durai-managing-director-gobright.webp', 'active', '2026-07-13 06:53:20'),
(7, 'GB2026002', 'Mr. Sridhar', 'Executive Director (ED)', 'Operations and client success', 'assets/img/teams/mr-sridhar-executive-director-gobright.webp', 'active', '2026-07-13 06:53:20'),
(8, 'GB2026003', 'Mr. Dhayala Prakash', 'Chief Administrative Officer (CAO)', 'Administration leadership and operations', 'assets/img/teams/mr-dhayala-prakash-chief-administrative-officer-gobright.webp', 'active', '2026-07-13 06:53:20'),
(9, 'GB2026004', 'Mrs. Akila', 'Administrative Officer (AO)', 'Administration and coordination', 'assets/img/teams/mrs-akila-administrative-officer-gobright.webp', 'active', '2026-07-13 06:53:20'),
(10, 'GB2026005', 'Mr. Vignesh', 'Senior IT Executive', 'Web technology and infrastructure', 'assets/img/teams/mr-vignesh-senior-it-executive-gobright.webp', 'active', '2026-07-13 06:53:20'),
(11, 'GB2026006', 'Mr. Praveen', 'Content Creator', 'Content strategy and production', 'assets/img/teams/mr-praveen-content-creator-gobright.webp', 'active', '2026-07-13 06:53:20'),
(12, 'GB2026007', 'Mr. Bala Ganesan', 'Content Creator', 'Content creation and production', 'assets/img/teams/mr-bala-ganesan-content-creator-gobright.webp', 'active', '2026-07-13 06:53:20'),
(13, 'GB2026008', 'Mr. Fradrick', 'Full Stack Developer', 'Full-stack web development', 'assets/img/teams/mr-fradrick-full-stack-developer-gobright.webp', 'active', '2026-07-13 06:53:20'),
(14, 'GB2026009', 'Mr. Anbarasan', 'Full Stack Developer', 'Full-stack web development', 'assets/img/teams/mr-anbarasan-full-stack-developer-gobright.webp', 'active', '2026-07-13 06:53:20');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(190) NOT NULL,
  `employment_type` varchar(80) NOT NULL DEFAULT 'Full-time',
  `experience` varchar(120) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `employment_type`, `experience`, `description`, `requirements`, `status`, `created_at`) VALUES
(51, 'Digital Marketing Executive (SEO)', 'Full-time', '1-3 years', 'We Are Hiring – Digital Marketing ( SEO Specialist )\n\nAt GoBright, we don’t just offer jobs — we create opportunities for learning, creativity, career growth, and long-term success. Join our fast-growing team and work on exciting digital marketing and branding projects.\n\n📌 Position: Digital Marketing ( SEO Specialist )\n📌 Experience Required: 0–1 Year\n📌 Job Location: Trichy – Work From Office\n\n📈 Skills We’re Looking For:\n\n✅ Strong knowledge of Search Engine Optimization (SEO)\n✅ On-page, off-page, and technical SEO\n✅ Local SEO and Google Business Profile optimization\n✅ Answer Engine Optimization (AEO)\n✅ Generative Engine Optimization (GEO)\n✅ Keyword research and competitor analysis\n✅ Google Search Console and Google Analytics\n✅ Social media management and content planning\n✅ Basic knowledge of Google Ads and Meta Ads\n✅ SEO-friendly content writing\n✅ Website performance and keyword ranking analysis\n✅ Link-building and backlink strategies\n✅ Good communication and teamwork skills\n✅ Attention to detail and ability to meet deadlines\n\n💼 Key Responsibilities:\n\n• Develop and implement SEO strategies for client websites\n\n• Conduct keyword research and identify ranking opportunities\n\n• Optimize website pages, headings, meta titles, descriptions, images, and content\n• Implement local SEO strategies to improve location-based visibility\n\n• Optimize content for search engines, answer engines, and AI-powered search platforms\n\n• Manage and optimize Google Business Profiles\n• Monitor website traffic, keyword rankings, and SEO performance\n• Plan and manage social media content and campaigns\n• Coordinate with content writers, designers, and web developers\n• Prepare weekly and monthly digital marketing reports\n• Stay updated with the latest SEO, AEO, GEO, and digital marketing trends\n\n💼 What You’ll Get:\n\n✨ Real career growth opportunities\n✨ A supportive and creative work environment\n✨ Experience working with multiple brands and industries\n✨ Opportunities to learn SEO, social media marketing, paid advertising, and performance marketing\n✨ The chance to contribute to exciting digital projects\n\nReady to grow your digital marketing career with GoBright?\n\nSend your resume and portfolio today!\n\n📧 [gobright.growth@gmail.com](mailto:gobright.growth@gmail.com)\n📞 +91 89255 50774 | +91 89255 50778\n📍 GoBright, Paradise Towers Complex, No. 52/B, First Floor, Thennur High Road, Trichy – 620017\n\n#GoBright #Hiring #DigitalMarketing #SEOSpecialist #LocalSEO #AEO #GEO #SEOJobs #DigitalMarketingJobs #TrichyJobs #FreshersJobs #JobOpening #JoinOurTeam', 'SEO|Google Ads|Meta Ads|Analytics', 'active', '2026-07-11 05:58:18'),
(52, 'Graphic Designer', 'Full-time', '1-3 years', '🔴 We Are Hiring – Graphic Designer! 🔴\nAt GoBright, we don\'t just offer jobs — we build futures. Join a fast-growing, creative-driven team where talent, ambition, and growth come together.\n\n📌 Position: Graphic Designer\n\n 📌 Experience Required: Minimum 1 Year\n\n 📌 Job Location: Trichy (Work From Office)\n\n🖌️ Skills We\'re Looking For:\n\n ✅ Adobe Illustrator\n\n ✅ Adobe InDesign\n\n ✅ Adobe XD\n\n ✅ Basic Video Editing Skills\n\n ✅ Strong creativity and design sense\n\n ✅ Attention to detail and ability to meet deadlines\n\n ✅ Good communication and teamwork\n\n💼 What You\'ll Get:\n\n ✨ Real growth opportunities\n\n ✨ A supportive and creative work culture\n\n ✨ The chance to work on exciting brand projects\n\nIf you\'re ready to build your career with us, send your resume/portfolio today! 👇\n📧 gobright.growth@gmail.com\n 📞 +91 89255 50774 | +91 95001 48123\n 📍 GoBright, Paradise Towers Complex, No. 52/B, First Floor, Thennur High Road, Trichy - 620017\nhashtag#GoBright hashtag#Hiring hashtag#GraphicDesigner hashtag#TrichyJobs hashtag#JobOpening hashtag#CareerGrowth hashtag#DesignJobs hashtag#NowHiring hashtag#VideoEditing hashtag#JoinOurTeam hashtag#CreativeCareers', 'Adobe Creative Suite|Typography|Branding', 'active', '2026-07-11 05:58:18'),
(53, 'Content Writer', 'Full-time', '1+ year', 'Write clear search-friendly brand content.', 'English writing|SEO basics|Research', 'active', '2026-07-11 05:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(190) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `email` varchar(190) NOT NULL,
  `service` varchar(190) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `source_page` varchar(255) NOT NULL DEFAULT '',
  `extra_data` text DEFAULT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `name`, `phone`, `email`, `service`, `message`, `source_page`, `extra_data`, `status`, `created_at`) VALUES
(1, 'Demo Lead One', '9876500001', 'lead1@example.com', 'Branding', 'Need a complete identity for a new business.', '', NULL, 'new', '2026-07-11 05:58:18'),
(2, 'Demo Lead Two', '9876500002', 'lead2@example.com', 'Digital Marketing', 'Looking for lead generation support.', '', NULL, 'contacted', '2026-07-11 05:58:18'),
(3, 'Demo Lead Three', '9876500003', 'lead3@example.com', 'Web Development', 'Need a fast company website.', '', NULL, 'new', '2026-07-11 05:58:18'),
(4, 'Demo Lead Four', '9876500004', 'lead4@example.com', 'SEO', 'Want to improve local search visibility.', '', NULL, 'qualified', '2026-07-11 05:58:18'),
(5, 'Demo Lead Five', '9876500005', 'lead5@example.com', 'Photography', 'Need a product photography quotation.', '', NULL, 'closed', '2026-07-11 05:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(190) NOT NULL,
  `role` varchar(190) NOT NULL DEFAULT '',
  `photo` longtext NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL DEFAULT 5,
  `review_text` text NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `name`, `role`, `photo`, `rating`, `review_text`, `status`, `created_at`) VALUES
(1, 'Arun Kumar', 'Founder, AK Foods', '', 5, 'GoBright gave our brand a clear identity and a stronger digital presence.', 'active', '2026-07-11 05:58:18'),
(2, 'Priya S', 'Marketing Manager', '', 5, 'The team is responsive, creative and focused on measurable business growth.', 'active', '2026-07-11 05:58:18'),
(3, 'Mohamed Irfan', 'Retail Entrepreneur', '', 5, 'Our campaigns improved quickly and the reporting was easy to understand.', 'active', '2026-07-11 05:58:18'),
(4, 'Nivetha R', 'Clinic Administrator', '', 5, 'A dependable partner for our website, content and local marketing.', 'active', '2026-07-11 05:58:18'),
(5, 'Karthik Raj', 'Startup Founder', '', 4, 'Professional execution from strategy through launch.', 'active', '2026-07-11 05:58:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_username_unique` (`username`);

--
-- Indexes for table `career_applications`
--
ALTER TABLE `career_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `career_applications_job_id_index` (`job_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employees_code_unique` (`employee_code`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `career_applications`
--
ALTER TABLE `career_applications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `career_applications`
--
ALTER TABLE `career_applications`
  ADD CONSTRAINT `career_applications_job_fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
