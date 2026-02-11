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
    status ENUM('unverified','verified', 'denied','selected','grand_prix_1','grand_prix_2','grand_prix_3') NOT NULL DEFAULT 'unverified',
    producer VARCHAR(50),
    tags VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (edition_id) REFERENCES editions(id) ON DELETE NO ACTION,
    FOREIGN KEY (country_id) REFERENCES countries(id)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: settings
-- --------------------------------------------------------
CREATE TABLE settings (
    key_name VARCHAR(100) PRIMARY KEY,
    value TEXT,
    -- description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: content (Key-Value style for dynamic UI text)
-- --------------------------------------------------------
CREATE TABLE content (
    key_name VARCHAR(100) PRIMARY KEY,
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
    note TEXT NOT NULL,
    grade INT NOT NULL,
    status ENUM('assigned','done') NOT NULL,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table: tokens
-- --------------------------------------------------------
CREATE TABLE tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    value VARCHAR(100) NOT NULL,
    status ENUM('pending','used','revoked') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Indexes for performance
CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_admins_login ON admins(login);