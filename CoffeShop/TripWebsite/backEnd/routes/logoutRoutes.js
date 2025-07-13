const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');


// POST route for user login
router.post('/', (req, res) => {
    userController.logout(req,res);
});

module.exports = router;