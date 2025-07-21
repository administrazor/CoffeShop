const db = require("../config/database");
const queries = require("../repositories/ordersQueries");

function addOrderToDatabase({clientId,orderItems, TotalAmount,discout,discoutAmount,datetime,employee }) {
    return new Promise((resolve, reject) => {
        db.query(queries.INSERT_ORDER, [clientId,orderItems, TotalAmount,discout,discoutAmount,datetime,employee], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    addOrderToDatabase,
    };
    