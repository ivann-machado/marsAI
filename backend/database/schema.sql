-- Database: bilga_marsai
CREATE DATABASE IF NOT EXISTS bilga_marsai CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE bilga_marsai;

-- --------------------------------------------------------
-- Table: admins
-- --------------------------------------------------------
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) DEFAULT NULL,
    role ENUM('admin', 'super admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: countries
-- --------------------------------------------------------
CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    iso_code VARCHAR(5) NOT NULL UNIQUE
) ENGINE=InnoDB;

INSERT INTO countries (id, name, iso_code) VALUES (1, 'France', 'FR');

-- --------------------------------------------------------
-- Table: editions
-- --------------------------------------------------------
CREATE TABLE editions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    year YEAR NOT NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: events
-- --------------------------------------------------------
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('atelier') NOT NULL,
    name VARCHAR(50) NOT NULL,
    url VARCHAR(100) NOT NULL,
    logo VARCHAR(100) NOT NULL,
	info TEXT NOT NULL,
	place VARCHAR(100) NOT NULL,
	duration INT(11) NOT NULL,
	cover_image VARCHAR(100) NOT NULL,
    date DATE NOT NULL
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: videos
-- --------------------------------------------------------
CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edition_id INT NOT NULL,
    country_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    url VARCHAR(100) NOT NULL,
    filename VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    cover_image VARCHAR(100) NOT NULL,
    verified TINYINT(1) DEFAULT 0,
    status ENUM('unverified','verified', 'denied','selected') NOT NULL DEFAULT 'unverified',
    producer VARCHAR(50),
    producer_image VARCHAR(100),
    linkedin_link VARCHAR(50),
    youtube_link VARCHAR(50),
    scenario_ai VARCHAR(50),
    video_gen_ai VARCHAR(50),
    sound_ai VARCHAR(50),
    postprod_ai VARCHAR(50),
    tags VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (edition_id) REFERENCES editions(id) ON DELETE NO ACTION,
    FOREIGN KEY (country_id) REFERENCES countries(id)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: subtitles
-- --------------------------------------------------------
CREATE TABLE subtitles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    video_id INT NOT NULL,
    language ENUM('french','english') NOT NULL,
    filename VARCHAR(100) NOT NULL,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: prized_videos
-- --------------------------------------------------------
CREATE TABLE prized_videos (
    video_id INT PRIMARY KEY,
    prix VARCHAR(50) NOT NULL,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: jury
-- --------------------------------------------------------
CREATE TABLE jury (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edition_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    bio VARCHAR(200) NOT NULL,
    photo VARCHAR(50) NOT NULL,
    profession VARCHAR(50) NOT NULL,
    FOREIGN KEY (edition_id) REFERENCES editions(id)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: sponsors
-- --------------------------------------------------------
CREATE TABLE sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    edition_id INT NOT NULL,
    type ENUM('official','media','technical','other') NOT NULL,
    name VARCHAR(50) NOT NULL,
    url VARCHAR(100) NOT NULL,
    logo VARCHAR(100) NOT NULL,
    FOREIGN KEY (edition_id) REFERENCES editions(id)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: newsletters
-- --------------------------------------------------------
CREATE TABLE newsletters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: reservations
-- --------------------------------------------------------
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: settings
-- --------------------------------------------------------
CREATE TABLE settings (
    name VARCHAR(100) PRIMARY KEY,
    value TEXT,
    -- description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: content (Key-Value style for dynamic UI text)
-- --------------------------------------------------------
CREATE TABLE content (
    name VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: reviews
-- --------------------------------------------------------
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    video_id INT NOT NULL,
    note VARCHAR(300) NOT NULL,
    grade INT NOT NULL,
    status ENUM('assigned','done') DEFAULT 'assigned',
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: tokens
-- --------------------------------------------------------
CREATE TABLE tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    value VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('pending','used','revoked') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: process_queue
-- --------------------------------------------------------
CREATE TABLE process_queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    video_id INT NOT NULL,
    status ENUM('pending','done','failed','timeout') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	filename VARCHAR(100) NOT NULL,
    type ENUM('yt_upload','yt_status_check') NOT NULL,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE NO ACTION
) ENGINE=InnoDB;

-- Indexes for performance
CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_admins_login ON admins(login);