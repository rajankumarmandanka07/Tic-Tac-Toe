USE sakila;

-- SQL Practice - Part 1

-- Use “Sakila” database for the following questions

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

-- Q9 List the last names of actors, as well as how many actors have that last 
SELECT last_name, COUNT(*) as actore_count
FROM actor
GROUP BY last_name
ORDER BY actore_count;

-- Q10 Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables “staff” and “address”. (2 rows)
SELECT s.first_name, s.last_name, a.address 
FROM staff AS s
JOIN address AS a
ON s.address_id = a.address_id;


-- Use “world” database for the following questions 

USE world;

-- Q1 Display all columns and 10 rows from table “city”.(10 rows) 

SELECT * FROM city LIMIT 10;