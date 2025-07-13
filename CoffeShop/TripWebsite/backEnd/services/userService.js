const db = require("../config/database");
const queries = require("../repositories/userQueries");
const bcrypt = require("bcrypt");

function addUserToDatabase({
  firstname,
  lastname,
  address,
  phoneNumber,
  gender,
  email,
  password,
}) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return reject(err);
      } else {
        db.query(
          queries.INSERT_USER,
          [firstname, lastname, address, phoneNumber, gender, email, hash],
          (err, result) => {
            if (err) {
              return reject(err);
            } else {
              const user = {
                id: result.insertId,
                firstname,
                lastname,
                address,
                phoneNumber,
                gender,
                email,
              };
              console.log("User added to database successfully:", user); // Log success if no errors
              resolve(user);
            }
          }
        );
      }
    });
  });
}

function authUser(email, password) {
  return new Promise((resolve, reject) => {
    db.query(queries.authenticate_query, [email], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length > 0) {
        const hashedpassword = result[0].password;

        bcrypt.compare(password, hashedpassword, (err, isMatch) => {
          if (err) {
            return reject(err);
          } else if (isMatch) {
            return resolve(result[0]);
          } else {
            return reject(new Error("Invalid email or password"));
          }
        });
      } else {
        return reject(new Error("User not found"));
      }
    });
  });
}

module.exports = {
  addUserToDatabase,
  authUser,
};
