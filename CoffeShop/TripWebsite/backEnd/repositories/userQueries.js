const INSERT_USER = `
    INSERT INTO users 
    (firstname, lastname, address, phoneNumber, gender, email, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
`;

const authenticate_query = `SELECT * FROM users WHERE email =?`;

module.exports = {
  INSERT_USER,
  authenticate_query,
};
