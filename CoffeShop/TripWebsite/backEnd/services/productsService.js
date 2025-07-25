const db = require("../config/database");
const queries = require("../repositories/productsQueries");

// Add a new product
function addProductToDatabase({ name, price, description, timeToPreper, category, image_path }) {
  return new Promise((resolve, reject) => {
    db.query(
      queries.INSERT_PRODUCT,
      [name, price, description, timeToPreper, category, image_path],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

// Get all products
function getAllProductsFromDatabase() {
  return new Promise((resolve, reject) => {
    db.query(queries.GET_ALL_PRODUCTS, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// Update product by ID
function updateProductInDatabase(id, { name, price, description, timeToPreper, category, image_path }) {
  return new Promise((resolve, reject) => {
    db.query(
      queries.UPDATE_PRODUCT_BY_ID,
      [name, price, description, timeToPreper, category, image_path, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

// Delete product by ID
function deleteProductFromDatabase(id) {
  return new Promise((resolve, reject) => {
    db.query(queries.DELETE_PRODUCT_BY_ID, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  addProductToDatabase,
  getAllProductsFromDatabase,
  updateProductInDatabase,
  deleteProductFromDatabase,
};
