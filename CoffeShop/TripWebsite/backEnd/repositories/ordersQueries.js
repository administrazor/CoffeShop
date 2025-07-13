const INSERT_ORDER=`
INSERT INTO orders
    (clientId,orderItems, TotalAmount,discount,discountAmount,employee)
    VALUES (?,?,?,?,?,?)
`;

module.exports = {
    INSERT_ORDER,
};