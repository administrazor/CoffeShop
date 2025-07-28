const reviewService = require('../services/reviewService');


async function addReview(req, res) {
    try {
        const reviewData = req.body; 
        await reviewService.addReviewToDatabase(reviewData); 
        res.status(200).send('review added successfully!');
    } catch (err) {
        console.error('Error in addreview:', err.message);
        res.status(500).send('Error adding review: ' + err.message);
    }
}


module.exports = {
  addReview,
};
