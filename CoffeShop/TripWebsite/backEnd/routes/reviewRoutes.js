const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
 

// POST route for user signup to add a review
router.post('/', (req, res) => {
    reviewController.addReview(req, res);
});

// GET route to fetch all reviews
router.get('/', (req, res) => {
    reviewController.getAllReviews(req, res);
});
 
module.exports = router;