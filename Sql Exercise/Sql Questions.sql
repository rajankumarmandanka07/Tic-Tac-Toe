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

-- Q2 Modify the above query to display from row # 16 to 20 with all columns. (5 rows) 
SELECT * FROM city LIMIT 15, 5;

-- Q3 How many rows are available in the table city. (1 row)-4079. 
SELECT COUNT(*) FROM city;

-- Q4 Using city table find out which is the most populated city. 
-- ('Mumbai (Bombay)', '10500000') 
SELECT name , population FROM city 
ORDER BY population DESC LIMIT 1;

-- Q5 Using city table find out the least populated city. 
-- ('Adamstown', '42') 
SELECT name , population FROM city 
ORDER BY population LIMIT 1;

-- Q6 Display name of all cities where population is between 670000 to 700000. (13 rows)
SELECT name , population FROM city 
WHERE population 
BETWEEN 670000 AND 700000;

-- Q7 Find out 10 most populated cities and display them in a decreasing order i.e. most populated city to appear first. 
SELECT name , population FROM city 
ORDER BY population DESC LIMIT 10;

-- Q8 Order the data by city name and get first 10 cities from city table. 
SELECT * FROM city ORDER BY name LIMIT 10;

-- Q9 Display all the districts of USA where population is greater than 3000000, from city table. (6 rows) 
SELECT District, population
FROM city
WHERE CountryCode = "USA" AND population > 3000000;