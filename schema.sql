-- Drops the social_db if it already exists --
DROP DATABASE IF EXISTS social_db;

-- Create a database called social_db --
CREATE DATABASE social_db;

USE social_db;

/* Created tables for users, posts, follows, post w/ hastags, and hastags with a primary key that auto-increments, and a text field */

CREATE TABLE Users  (
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstname  VARCHAR(45) NOT NULL,
    lastname  VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    avatar VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Following (
    id INTEGER NOT NULL AUTO_INCREMENT,
    followed INT,
    followedBy INT,
    PRIMARY KEY (id)  
);
  

CREATE TABLE Posts (
    id INTEGER NOT NULL AUTO_INCREMENT,
    author_id INT,
    text VARCHAR(45),
    image VARCHAR (45),
    timestamp TIMESTAMP,
    PRIMARY KEY (id)  
);

CREATE TABLE Posts_Has_Hastag (
    id INTEGER NOT NULL AUTO_INCREMENT,
    hastag_id INT,
    post_id INT,
    PRIMARY KEY (id) 
);

CREATE TABLE Hastag (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR (45),
    PRIMARY KEY (id) 
);