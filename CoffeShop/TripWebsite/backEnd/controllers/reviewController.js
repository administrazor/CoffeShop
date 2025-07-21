const reviewService = require('../services/reviewService');
const { sendBadReviewEmail } = require("../services/emailService");


async function addReview(req, res) {
    try {
        const { firstname, review, rating, clientId } = req.body; 
        await reviewService.addReviewToDatabase({ firstname, review, rating, clientId });
         if (rating < 3) {
            await sendBadReviewEmail({ rating, review });
         } 
        res.status(200).send('review added successfully!');
    } catch (err) {
        console.error('Error in addreview:', err.message);
        res.status(500).send('Error adding review: ' + err.message);
    }
}

async function getAllReviews(req, res) {
    try {
        const reviews = await reviewService.getAllReviewsFromDatabase();
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err.message);
        res.status(500).send('Error fetching reviews: ' + err.message);
    }
}

module.exports = {
  addReview,
  getAllReviews, 
};
