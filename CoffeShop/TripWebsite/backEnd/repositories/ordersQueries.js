const INSERT_ORDER=`
INSERT INTO orders
    (clientId,orderItems, TotalAmount,discount,discountAmount,datetime,employee)
    VALUES (?,?,?,?,?,?,?)
`;

module.exports = {
    INSERT_ORDER,
};