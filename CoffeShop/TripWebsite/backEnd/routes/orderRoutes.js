const express = require('express');
const router = express.Router();
const userController = require('../controllers/orderController');
 
// POST route for user signup
router.post('/', (req, res) => {
    console.log('Received review request,data:', req.body);
    userController.addOrder(req, res); 
});

 
module.exports = router;