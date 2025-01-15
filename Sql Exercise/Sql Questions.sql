USE sakila;

-- Q1 Display all tables available in the database “sakila”
SHOW TABLES;

-- Q2 Display structure of table “actor”. (4 row)
DESCRIBE actor;

-- Q3 Display the schema which was used to create table “actor” and view the complete schema using the viewer. (1 row) 
SHOW CREATE TABLE actor;

-- Q4 Display the first and last names of all actors from the table actor. (200 rows) 
SELECT first_name, last_name FROM actor;

-- Q5 Which actors have the last name ‘Johansson’. (3 rows) 
SELECT first_name, last_name 
FROM actor 
WHERE last_name = 'Johansson';

-- Q7 You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information? (1 row) 
SELECT actor_id, first_name, last_name 
FROM actor 
WHERE first_name = 'Joe';

-- Q8 Which last names are not repeated? (66 rows) 
SELECT last_name 
FROM actor 
GROUP BY last_name 
HAVING COUNT(last_name) = 1;