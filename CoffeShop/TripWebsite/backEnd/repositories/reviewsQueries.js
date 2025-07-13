const INSERT_REVIEW =`
INSERT INTO reviews
    (firstname,review,rating,clientId)
    VALUES (?, ?, ?,?)`;

    module.exports = {
        INSERT_REVIEW,
    };