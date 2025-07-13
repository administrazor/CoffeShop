const userService = require('../services/orderService');


async function addOrder(req, res) {
    try {
        const orderData = req.body; 
        await userService.addOrderToDatabase(orderData); 
        res.status(200).send('order added successfully!');
    } catch (err) {
        console.error('Error in addOrder:', err.message);
        res.status(500).send('Error adding order: ' + err.message);
    }
}

module.exports = {
    addOrder,
  };
  