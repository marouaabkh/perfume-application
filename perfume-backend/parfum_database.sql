CREATE DATABASE IF NOT EXISTS perfume_catalog;
USE perfume_catalog;
CREATE TABLE IF NOT EXISTS perfumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    perfumename VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    perfumeprice DECIMAL(10,2) NOT NULL,
    perfumeimage VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);