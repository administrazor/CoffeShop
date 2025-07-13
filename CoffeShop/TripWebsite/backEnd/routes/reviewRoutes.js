const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
 
// POST route for user signup
router.post('/', (req, res) => {
    reviewController.addReview(req, res);
});
 
module.exports = router;