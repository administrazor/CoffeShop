const INSERT_PRODUCT = `
INSERT INTO products
  (name, price, description, timeToPreper, category, image_path)
VALUES (?, ?, ?, ?, ?, ?)
`;

const GET_ALL_PRODUCTS = `
SELECT *
FROM products
ORDER BY id ASC
`;

const UPDATE_PRODUCT_BY_ID = `
UPDATE products SET
  name = ?,
  price = ?,
  description = ?,
  timeToPreper = ?,
  category = ?,
  image_path = ?
WHERE id = ?
`;

const DELETE_PRODUCT_BY_ID = `
DELETE FROM products
WHERE id = ?
`;

module.exports = {
  INSERT_PRODUCT,
  GET_ALL_PRODUCTS,
  UPDATE_PRODUCT_BY_ID,
  DELETE_PRODUCT_BY_ID
};
