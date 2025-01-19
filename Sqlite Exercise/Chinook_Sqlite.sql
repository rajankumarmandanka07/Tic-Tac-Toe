-- Exercise 1

-- Q.1 What is the title of the album with AlbumId 67? 
SELECT AlbumId, Title
FROM Album
WHERE AlbumId = 67;

-- Q.2 Find the name and length (in seconds) of all tracks that have length between 50 and 70 seconds. 
SELECT Name, Milliseconds / 1000
FROM Track
WHERE Milliseconds / 1000 BETWEEN 50 AND 70;

-- Q.3 List all the albums by artists with the word ‘black’ in their name. 
SELECT Al.Title, Ar.Name
FROM Album Al
JOIN Artist Ar ON Al.ArtistId = Ar.ArtistId
WHERE Ar.Name LIKE '%black%';

-- Q.4 Provide a query showing a unique/distinct list of billing countries from the Invoice table 
SELECT DISTINCT BillingCountry
FROM Invoice;

-- Q.5 Display the city with highest sum total invoice. 
SELECT BillingCity, SUM(Total) 
FROM Invoice
GROUP BY BillingCity
ORDER BY SUM(Total) DESC
LIMIT 1;

-- Q.6 Produce a table that lists each country and the number of customers in that country. (You only need to include countries that have customers) in descending order. (Highest count at the top) 
SELECT Country, COUNT(CustomerId)
FROM Customer
GROUP BY Country
HAVING COUNT(CustomerId) > 0
ORDER BY COUNT(CustomerId) DESC;

-- Q.7 Find the top five customers in terms of sales i.e. find the five customers whose total combined invoice amounts are the highest. Give their name, CustomerId and total invoice amount. Use join 
SELECT c.CustomerId, c.FirstName, c.LastName, SUM(i.total)
FROM Customer c
JOIN Invoice i ON c.CustomerId = i.CustomerId
GROUP BY c.CustomerId
ORDER BY SUM(i.total) DESC LIMIT 5;

-- Q.8 Find out state wise count of customerID and list the names of states with count of customerID in decreasing order. Note:- do not include where states is null value.
SELECT State, COUNT(CustomerId)
FROM Customer
WHERE State IS NOT NULL
GROUP BY State
ORDER BY COUNT(CustomerId) DESC;

-- Q.10 Provide a query showing only the Employees who are Sales Agents.
SELECT EmployeeId, FirstName, LastName, Title
FROM Employee
WHERE Title = 'Sales Support Agent';

-- Exercise 2
-- Q.1 Display Most used media types: their names and count in descending order. 

SELECT m.Name, COUNT(TrackId)
FROM MediaType m
JOIN Track t ON m.MediaTypeId = t.MediaTypeId
GROUP BY m.MediaTypeId
ORDER BY COUNT(TrackId) DESC;

-- Q.2 Provide a query showing the Invoices of customers who are from Brazil. The resultant table should show the customer's full name, Invoice ID, Date of the invoice and billing country. 
SELECT c.FirstName || ' ' || c.LastName AS Customer_Name, 
       i.InvoiceId, 
       i.InvoiceDate, 
       i.BillingCountry
FROM Invoice i
JOIN Customer c ON i.CustomerId = c.CustomerId
WHERE c.Country = 'Brazil';

-- Q.3 Display artist name and total track count of the top 10 rock bands from dataset. 
SELECT Artist.Name AS Artist_Name, COUNT(Track.TrackId) AS Total_Tracks
FROM Artist
JOIN Album ON Artist.ArtistId = Album.ArtistId
JOIN Track ON Album.AlbumId = Track.AlbumId
JOIN Genre ON Track.GenreId = Genre.GenreId
WHERE Genre.Name = 'Rock'
GROUP BY Artist.ArtistId
ORDER BY Total_Tracks DESC
LIMIT 10;

-- Q.4 Display the Best customer (in case of amount spent). Full name (first name and last name) 
SELECT Customer.FirstName || ' ' || Customer.LastName AS Customer_Name, 
       SUM(Invoice.Total) AS Total_Spent
FROM Customer
JOIN Invoice ON Customer.CustomerId = Invoice.CustomerId
GROUP BY Customer.CustomerId
ORDER BY Total_Spent DESC
LIMIT 1;
