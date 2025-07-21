const INSERT_REVIEW =`
INSERT INTO reviews
    (firstname,review,rating,clientId)
    VALUES (?, ?, ?,?)`;

const GET_ALL_REVIEWS = `
SELECT firstname, review, rating
FROM reviews
ORDER BY id DESC`;


    module.exports = {
        INSERT_REVIEW,
        GET_ALL_REVIEWS,
    };