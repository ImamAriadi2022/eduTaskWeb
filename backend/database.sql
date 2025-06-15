-- Buat database
CREATE DATABASE IF NOT EXISTS edutaskweb;
USE edutaskweb;

-- Tabel user
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Tabel tugas
CREATE TABLE IF NOT EXISTS tugas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  course VARCHAR(100) NOT NULL,
  type ENUM('Individu','Kelompok') NOT NULL,
  jenis VARCHAR(50) NOT NULL,
  deadline DATE,
  status VARCHAR(30) NOT NULL,
  note TEXT,
  anggota TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);