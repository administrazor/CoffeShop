// layer that communicates with the db

const db = require("../config/database");
const queries = require("../repositories/accountDetailsQueries");

function getClientInfo(id) {
  return new Promise((resolve, reject) => {
    db.query(queries.GET_CLIENT_INFO, [id], (err, rows) => {
      if (err) {
        console.error("Database query error:", err.message);
        return reject(err);
      }
      if (rows.length === 0) {
        return reject(new Error("User not found"));
      }
      resolve(rows); // Return all rows
    });
  });
}

function updateClientInfo(id, updatedData) {
  return new Promise((resolve, reject) => {
    db.query(
      queries.UPDATE_CLIENT_INFO,
      [
        updatedData.firstname,
        updatedData.lastname,
        updatedData.address,
        updatedData.phoneNumber,
        updatedData.gender,
        updatedData.email,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Database update error:", err.message);
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

function deleteClientInfo(id) {
  console.log("Delete Client Info ID:", id);
  return new Promise((resolve, reject) => {
    // delete related rows in the orders table
    db.query(queries.DELETE_ORDERS_BY_CLIENT_ID, [id], (err, result) => {
      if (err) {
        console.error("Database delete error (orders):", err.message);
        return reject(err);
      }
      // delete related rows in the reviews table
      db.query(queries.DELETE_REVIEWS_BY_CLIENT_ID, [id], (err, result) => {
        if (err) {
          console.error("Database delete error (reviews):", err.message);
          return reject(err);
        } //  delete the user
        db.query(queries.DELETE_CLIENT_INFO, [id], (err, result) => {
          if (err) {
            console.error("Database delete error (user):", err.message);
            return reject(err);
          }
          resolve(result);
        });
      });
    });
  });
}

function getOrderHistory(userId) {
  return new Promise((resolve, reject) => {
    db.query(queries.GET_ORDER_HISTORY_BY_USER_ID, [userId], (err, rows) => {
      if (err) {
        console.error("Database query error:", err.message);
        return reject(err);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  getClientInfo,
  updateClientInfo,
  deleteClientInfo,
  getOrderHistory,
};
