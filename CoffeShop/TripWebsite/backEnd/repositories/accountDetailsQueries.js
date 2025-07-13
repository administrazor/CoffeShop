const GET_CLIENT_INFO = `
SELECT firstname,lastname,address,phoneNumber,gender,email from users where id=?
`;
const UPDATE_CLIENT_INFO = `
 UPDATE users SET firstname = ?, lastname = ?, address = ?, phoneNumber = ?, gender = ?, email = ? WHERE id = ? `;

const DELETE_CLIENT_INFO = ` DELETE FROM users WHERE id = ? `;

const DELETE_ORDERS_BY_CLIENT_ID = ` DELETE FROM orders WHERE clientId = ? `;

const DELETE_REVIEWS_BY_CLIENT_ID = ` DELETE FROM reviews WHERE clientId = ? `;

const GET_ORDER_HISTORY_BY_USER_ID = ` SELECT id, datetime, orderItems, totalAmount FROM orders WHERE clientId = ? `;

module.exports = {
  GET_CLIENT_INFO,
  UPDATE_CLIENT_INFO,
  DELETE_CLIENT_INFO,
  DELETE_ORDERS_BY_CLIENT_ID,
  DELETE_REVIEWS_BY_CLIENT_ID,
  GET_ORDER_HISTORY_BY_USER_ID,
};
