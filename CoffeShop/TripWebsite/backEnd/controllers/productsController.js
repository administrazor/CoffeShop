const productService = require('../services/productsService');

// Add a new product
async function addProduct(req, res) {
  try {
    const { name, price, description, timeToPreper, category } = req.body;
    const image_path = req.body;

    await productService.addProductToDatabase({
      name,
      price,
      description,
      timeToPreper,
      category,
      image_path,
    });

    res.status(200).json('Product added successfully!');
  } catch (err) {
    console.error('Error in addProduct:', err.message);
    res.status(500).json('Error adding product: ' + err.message);
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProductsFromDatabase();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).send('Error fetching products: ' + err.message);
  }
}

// Update a product
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const { name, price, description, timeToPreper, category } = req.body;
    const image_path = req.body;

    await productService.updateProductInDatabase(id, {
      name,
      price,
      description,
      timeToPreper,
      category,
      image_path,
    });

    res.status(200).json('Product updated successfully!');
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json('Error updating product: ' + err.message);
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    await productService.deleteProductFromDatabase(id);
    res.status(200).json('Product deleted successfully!');
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json('Error deleting product: ' + err.message);
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
