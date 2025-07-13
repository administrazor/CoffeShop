const db = require("../config/database");
const queries = require("../repositories/reviewsQueries");

function addReviewToDatabase({firstname, review , rating,clientId}) {
    return new Promise((resolve, reject) => {
        db.query(queries.INSERT_REVIEW, [firstname, review,rating,clientId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
  addReviewToDatabase,
  };
  