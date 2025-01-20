USE orders;

-- 1. Write a query to Display the product details (product_class_code, product_id, product_desc, product_price,) as per the following criteria and sort them in descending order of category: 
-- a. If the category is 2050, increase the price by 2000 
-- b. If the category is 2051, increase the price by 500 
-- c. If the category is 2052, increase the price by 600. Hint: Use case statement. no permanent change in table required. (60 ROWS) [NOTE: PRODUCT TABLE]
SELECT PRODUCT_CLASS_CODE, PRODUCT_ID, PRODUCT_DESC,
CASE
	WHEN PRODUCT_CLASS_CODE = 2050 THEN PRODUCT_PRICE + 2000
    WHEN PRODUCT_CLASS_CODE = 2051 THEN PRODUCT_PRICE + 500
    WHEN PRODUCT_CLASS_CODE = 2052 THEN PRODUCT_PRICE + 600
    ELSE PRODUCT_PRICE
END AS ADJUSTED_PRICE
FROM PRODUCT
ORDER BY PRODUCT_CLASS_CODE DESC;

-- 2. Write a query to display (product_class_desc, product_id, product_desc, product_quantity_avail ) and Show inventory status of products as below as per their available quantity: 
-- a. For Electronics and Computer categories, if available quantity is <= 10, show 'Low stock', 11 <= qty <= 30, show 'In stock', >= 31, show 'Enough stock' 
-- b. For Stationery and Clothes categories, if qty <= 20, show 'Low stock', 21 <= qty <= 80, show 'In stock', >= 81, show 'Enough stock' 
-- c. Rest of the categories, if qty <= 15 – 'Low Stock', 16 <= qty <= 50 – 'In Stock', >= 51 – 'Enough stock' For all categories, if available quantity is 0, show 'Out of stock'. Hint: Use case statement. (60 ROWS) [NOTE: TABLES TO BE USED – product, product_class]

SELECT pc.product_class_desc, p.product_id, p.product_desc, p.product_quantity_avail,
CASE 
	WHEN p.product_quantity_avail = 0 THEN 'Out of stock'
	WHEN pc.product_class_desc IN ('Electronics', 'Computer') THEN 
		CASE 
			WHEN p.product_quantity_avail <= 10 THEN 'Low stock'
			WHEN p.product_quantity_avail BETWEEN 11 AND 30 THEN 'In stock'
			WHEN p.product_quantity_avail >= 31 THEN 'Enough stock'
		END
	WHEN pc.product_class_desc IN ('Stationery', 'Clothes') THEN 
		CASE 
			WHEN p.product_quantity_avail <= 20 THEN 'Low stock'
			WHEN p.product_quantity_avail BETWEEN 21 AND 80 THEN 'In stock'
			WHEN p.product_quantity_avail >= 81 THEN 'Enough stock'
		END
	ELSE 
		CASE 
			WHEN p.product_quantity_avail <= 15 THEN 'Low stock'
			WHEN p.product_quantity_avail BETWEEN 16 AND 50 THEN 'In stock'
			WHEN p.product_quantity_avail >= 51 THEN 'Enough stock'
		END
END AS inventory_status
FROM product p
JOIN product_class pc
ON p.product_class_code = pc.product_class_code;
-- ORDER BY pc.product_class_desc;


-- 3. Write a query to Show the count of cities in all countries other than USA & MALAYSIA, with more than 1 city, in the descending order of CITIES. (2 rows) [NOTE: ADDRESS TABLE, Do not use Distinct]
SELECT country, COUNT(city) AS city_count
FROM address
WHERE country NOT IN ('USA', 'MALAYSIA')
GROUP BY country
HAVING COUNT(city) > 1
ORDER BY city_count DESC;

-- 5. Write a Query to display product id,product description,totalquantity(sum(product quantity) for an item which has been bought maximum no. of times (Quantity Wise) along with product id 201. (USE SUB-QUERY) (1 ROW) [NOTE: ORDER_ITEMS TABLE, PRODUCT TABLE]
SELECT p.PRODUCT_ID, p.PRODUCT_DESC, SUM(oi.PRODUCT_QUANTITY) AS TOTAL_QUANTITY
FROM ORDER_ITEMS oi
JOIN PRODUCT p ON oi.PRODUCT_ID = p.PRODUCT_ID
WHERE p.PRODUCT_ID IN (
        SELECT PRODUCT_ID
        FROM ORDER_ITEMS
        GROUP BY PRODUCT_ID
        HAVING SUM(PRODUCT_QUANTITY) = (SELECT MAX(TOTAL_QUANTITY)
                FROM (SELECT PRODUCT_ID,SUM(PRODUCT_QUANTITY) AS TOTAL_QUANTITY
                     FROM ORDER_ITEMS
                     GROUP BY PRODUCT_ID ) AS SubQuery
				)
    ) OR p.PRODUCT_ID = 201
GROUP BY p.PRODUCT_ID, p.PRODUCT_DESC
ORDER BY TOTAL_QUANTITY DESC;


-- 6. Write a query to display the customer_id,customer name, email and order details (order id, product desc,product qty, subtotal(product_quantity * product_price)) for all customers even if they have not ordered any item.(225 ROWS) [NOTE: TABLE TO BE USED - online_customer, order_header, order_items, product]
SELECT oc.CUSTOMER_ID, CONCAT(oc.CUSTOMER_FNAME, ' ', oc.CUSTOMER_LNAME) AS CUSTOMER_NAME, oc.CUSTOMER_EMAIL, oh.ORDER_ID, p.PRODUCT_DESC, oi.PRODUCT_QUANTITY, (oi.PRODUCT_QUANTITY * p.PRODUCT_PRICE) AS SUBTOTAL
FROM ONLINE_CUSTOMER oc
LEFT JOIN ORDER_HEADER oh ON oc.CUSTOMER_ID = oh.CUSTOMER_ID
LEFT JOIN ORDER_ITEMS oi ON oh.ORDER_ID = oi.ORDER_ID
LEFT JOIN PRODUCT p ON oi.PRODUCT_ID = p.PRODUCT_ID
ORDER BY oc.CUSTOMER_ID;