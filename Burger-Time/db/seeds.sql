-- Queries --

USE burgers_db;
INSERT INTO burgers (burger_name, devoured, date) 
VALUES 
	('The Avocado Burger', false, CURRENT_TIMESTAMP),
	('The Double Bacon Burger', false, CURRENT_TIMESTAMP),
	('The Avocado Bacon Burger', false, CURRENT_TIMESTAMP);