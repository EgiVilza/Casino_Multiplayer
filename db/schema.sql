DROP DATABASE IF EXISTS casinoDB;

CREATE database casinoDB;

USE casinoDB;

CREATE TABLE players (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    name VARCHAR(30) NOT NULL,
    balance INT NOT NULL
);
