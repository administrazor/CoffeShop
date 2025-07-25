const INSERT_ORDER=`
INSERT INTO orders
    (clientId,orderItems, TotalAmount,discount,discountAmount,datetime,employee,orderMethod,deliveryAddress,scheduledTime)
    VALUES (?,?,?,?,?,?,?,?,?,?)
`;

const GET_ORDERS = `
SELECT *
FROM orders
WHERE DATE(datetime) = CURDATE()
  AND status IN ('pending', 'preparing')
ORDER BY scheduledTime ASC;
`;


const UPDATE_ORDER_STATUS_BY_ID = `
UPDATE orders
SET status = ?
WHERE id = ?;
`;

const GET_TODAYS_SALES = `
SELECT COALESCE(SUM(TotalAmount), 0) AS totalSales
FROM orders
WHERE DATE(datetime) = CURDATE()
  AND status IN ('done');
`;

const GET_MOST_POPULAR_ITEM = `
SELECT orderItems FROM orders
`;

const COUNT_ORDERING_USERS_TODAY = `
SELECT COUNT(*) AS OrderingUsers
FROM users
WHERE id IN (
  SELECT DISTINCT clientId
  FROM orders
  WHERE DATE(datetime) = CURDATE()
);
`;

const GET_NUMBER_OF_USERS = `
SELECT COUNT(*) AS totalUsers
FROM users
`;

const GET_PRODUCTS_NAME = `
SELECT name
FROM products
`;


module.exports = {
    INSERT_ORDER,
    GET_ORDERS,
    UPDATE_ORDER_STATUS_BY_ID,
    GET_TODAYS_SALES,
    GET_MOST_POPULAR_ITEM,
    COUNT_ORDERING_USERS_TODAY,
    GET_NUMBER_OF_USERS,
    GET_PRODUCTS_NAME
};