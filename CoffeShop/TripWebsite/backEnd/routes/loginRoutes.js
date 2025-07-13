const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');


// POST route for user login
router.post('/', (req, res) => {
    console.log('Received login request,data:', req.body);
    userController.authenticateUser(req, res); // Handles response and error internally
    
});

module.exports = router;