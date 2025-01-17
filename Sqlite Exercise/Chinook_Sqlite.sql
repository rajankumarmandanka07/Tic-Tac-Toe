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