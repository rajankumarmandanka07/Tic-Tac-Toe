USE orders;

-- 1. Write a query to Display the product details (product_class_code, product_id, product_desc, product_price,) as per the following criteria and sort them in descending order of category: a. If the category is 2050, increase the price by 2000 b. If the category is 2051, increase the price by 500 c. If the category is 2052, increase the price by 600. Hint: Use case statement. no permanent change in table required. (60 ROWS) [NOTE: PRODUCT TABLE]
SELECT PRODUCT_CLASS_CODE,
PRODUCT_ID,
PRODUCT_DESC,
CASE
	WHEN PRODUCT_CLASS_CODE = 2050 THEN PRODUCT_PRICE + 2000
    WHEN PRODUCT_CLASS_CODE = 2051 THEN PRODUCT_PRICE + 500
    WHEN PRODUCT_CLASS_CODE = 2052 THEN PRODUCT_PRICE + 600
    ELSE PRODUCT_PRICE
    END AS ADJUSTED_PRICE
FROM PRODUCT
ORDER BY 
PRODUCT_CLASS_CODE DESC;