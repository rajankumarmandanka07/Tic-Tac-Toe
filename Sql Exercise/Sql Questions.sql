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

-- Q10 What is the value of name and population in the rows with ID =5, 23, 432 and 2021. Pl. write a single query to display the same. (4 rows). 
SELECT Id, name, population FROM city
WHERE Id IN (5, 25, 432, 2021);

-- SQL Practice – Part 2
-- Use “Sakila” database for the following questions

USE sakila;

-- Q1 Which actor has appeared in the most films? (‘107', 'GINA', 'DEGENERES', '42') 
SELECT a.actor_id, a.first_name, a.last_name, COUNT(f.film_id) 
FROM actor AS a JOIN film_actor AS f
ON a.actor_id = f.actor_id
GROUP BY a.actor_id, a.first_name, a.last_name
ORDER BY COUNT(f.film_id) DESC
LIMIT 1;

-- Q2 What is the average length of films by category? (16 rows) 
SELECT c.name, AVG(f.length) AS AVerage_Length
From category AS c 
JOIN film_category AS fc ON c.category_id = fc.category_id
JOIN film AS f ON fc.film_id = f.film_id
GROUP BY c.name;

-- Q3 Which film categories are long? (5 rows) 
SELECT c.name, AVG(f.length) AS Average_Length
FROM category  c
JOIN film_category  fc 
ON c.category_id = fc.category_id
JOIN film  f 
ON fc.film_id = f.film_id
GROUP BY c.name
HAVING AVG(f.length) > 120
ORDER BY Average_Length DESC LIMIT 5;

-- Q4 How many copies of the film “Hunchback Impossible” exist in the inventory system? (6)
SELECT COUNT(*) AS Total_Copies
FROM inventory  i
JOIN film  f 
ON i.film_id = f.film_id
WHERE f.title = 'Hunchback Impossible';


-- Q5 Using the tables “payment” and “customer” and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name (599 rows) 
SELECT c.customer_id,c.last_name, c.first_name, SUM(p.amount) AS Total_Paid
FROM customer  c
JOIN payment  p 
ON c.customer_id = p.customer_id
GROUP BY c.customer_id
ORDER BY c.last_name;


-- Use “world” database for the following questions 
USE world;

-- Q1 Write a query in SQL to display the code, name, continent and GNP for all the countries whose country name last second word is 'd’, using “country” table. (22 rows) 
SELECT code, name, continent, gnp 
FROM country
WHERE name LIKE '%d_';

-- Q2 Write a query in SQL to display the code, name, continent and GNP of the 2nd and 3rd highest GNP from “country” table. (Japan & Germany) 
SELECT code, name, continent, gnp 
FROM country
ORDER BY gnp DESC LIMIT 2 OFFSET 1;


-- Execute the following commands to create 2 new tables and insert records 
-- 
-- Table structure for table `departments` 
-- 
CREATE TABLE IF NOT EXISTS `departments` ( 
`DEPARTMENT_ID` decimal(4,0) NOT NULL DEFAULT '0', 
`DEPARTMENT_NAME` varchar(30) NOT NULL, 
`MANAGER_ID` decimal(6,0) DEFAULT NULL, 
`LOCATION_ID` decimal(4,0) DEFAULT NULL, 
PRIMARY KEY (`DEPARTMENT_ID`), 
KEY `DEPT_MGR_FK` (`MANAGER_ID`), 
KEY `DEPT_LOCATION_IX` (`LOCATION_ID`) 
) ; 

-- 
-- Dumping data for table `departments` 
-- 
INSERT INTO `departments` (`DEPARTMENT_ID`, `DEPARTMENT_NAME`, `MANAGER_ID`, `LOCATION_ID`) VALUES 
('10', 'Administration', '200', '1700'), 
('20', 'Marketing', '201', '1800'), 
('30', 'Purchasing', '114', '1700'), 
('40', 'Human Resources', '203', '2400'), 
('50', 'Shipping', '121', '1500'), 
('60', 'IT', '103', '1400'), 
('70', 'Public Relations', '204', '2700'), 
('80', 'Sales', '145', '2500'), 
('90', 'Executive', '100', '1700'), 
('100', 'Finance', '108', '1700'), 
('110', 'Accounting', '205', '1700'), 
('120', 'Treasury', '0', '1700'), 
('130', 'Corporate Tax', '0', '1700'), 
('140', 'Control And Credit', '0', '1700'), 
('150', 'Shareholder Services', '0', '1700'), 
('160', 'Benefits', '0', '1700'), 
('170', 'Manufacturing', '0', '1700'), 
('180', 'Construction', '0', '1700'), 
('190', 'Contracting', '0', '1700'), 
('200', 'Operations', '0', '1700'), 
('210', 'IT Support', '0', '1700'), 
('220', 'NOC', '0', '1700'), 
('230', 'IT Helpdesk', '0', '1700'), 
('240', 'Government Sales', '0', '1700'), 
('250', 'Retail Sales', '0', '1700'), 
('260', 'Recruiting', '0', '1700'), 
('270', 'Payroll', '0', '1700'); 