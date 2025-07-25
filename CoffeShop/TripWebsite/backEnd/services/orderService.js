const db = require("../config/database");
const queries = require("../repositories/ordersQueries");

function addOrderToDatabase({clientId,orderItems, TotalAmount,discout,discoutAmount,datetime,employee,orderMethod,deliveryAddress,scheduledTime }) {
    return new Promise((resolve, reject) => {
        db.query(queries.INSERT_ORDER, [clientId,orderItems, TotalAmount,discout,discoutAmount,datetime,employee,orderMethod,deliveryAddress,scheduledTime], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function getOrders() {
  return new Promise((resolve, reject) => {
    db.query(queries.GET_ORDERS, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function getTodaysSales(){
  return new Promise((resolve, reject) => {
    db.query(queries.GET_TODAYS_SALES, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function getMostPopularItem(){
  return new Promise((resolve, reject) => {
    db.query(queries.GET_MOST_POPULAR_ITEM, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function countOrderingUsersToday(){
  return new Promise((resolve, reject) => {
    db.query(queries.COUNT_ORDERING_USERS_TODAY, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function numbersOfUsers(){
  return new Promise((resolve, reject) => {
    db.query(queries.GET_NUMBER_OF_USERS, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function getProductsName(){
  return new Promise((resolve, reject) => {
    db.query(queries.GET_PRODUCTS_NAME, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}



function updateOrderStatus(orderId, status) {
  return new Promise((resolve, reject) => {
    db.query(
      queries.UPDATE_ORDER_STATUS_BY_ID,
      [status, orderId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

module.exports = {
    addOrderToDatabase,
    getOrders,
    updateOrderStatus,
    getTodaysSales,
    getMostPopularItem,
    countOrderingUsersToday,
    numbersOfUsers,
    getProductsName
    };
