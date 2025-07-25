const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// POST route to add a new product
router.post('/', (req, res) => {
    productsController.addProduct(req, res);
});

// GET route to fetch all products
router.get('/', (req, res) => {
    productsController.getAllProducts(req, res);
});

// PUT route to update a product
router.put('/:id', (req, res) => {
    productsController.updateProduct(req, res);
});

// DELETE route to delete a product
router.delete('/:id', (req, res) => {
    productsController.deleteProduct(req, res);
});

module.exports = router;
