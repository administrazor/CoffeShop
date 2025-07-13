const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// POST route for user signup
router.post('/', (req, res) => {
    console.log('Received signup request,data:', req.body);
    userController.addUser(req, res); // Handles response and error internally
});


module.exports = router;
