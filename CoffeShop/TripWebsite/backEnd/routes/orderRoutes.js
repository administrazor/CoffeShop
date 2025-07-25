const express = require('express');
const router = express.Router();
const userController = require('../controllers/orderController');
 
// POST route for user signup
router.post('/', (req, res) => {
    console.log('Received review request,data:', req.body);
    userController.addOrder(req, res); 
});

router.get('/', (req, res) => {
  userController.getOrders(req, res);
});

router.put('/:id', (req, res) => {
  userController.updateOrders(req, res);
});

router.get('/statistic', (req, res) => {
  userController.getOrderStatistic(req, res);
});
 
module.exports = router;