const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

// In-memory storage for products
let products = [];
let nextId = 1;

// Validation function
function validateProduct(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 3) {
    errors.push('Name is required and must be at least 3 characters long.');
  }

  if (typeof data.price !== 'number' || data.price < 0) {
    errors.push('Price is required and must be a non-negative number.');
  }

  if (data.inStock !== undefined && typeof data.inStock !== 'boolean') {
    errors.push('inStock must be a boolean value.');
  }

  return errors;
}

// Create a new product
app.post('/products', (req, res) => {
  const errors = validateProduct(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const product = {
    id: nextId++,
    name: req.body.name.trim(),
    price: req.body.price,
    inStock: req.body.inStock !== undefined ? req.body.inStock : true
  };

  products.push(product);
  res.status(201).json(product);
});

// Retrieve all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Retrieve a product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  res.json(product);
});

// Update an existing product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const errors = validateProduct(req.body);
  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const updatedProduct = {
    id,
    name: req.body.name.trim(),
    price: req.body.price,
    inStock: req.body.inStock !== undefined ? req.body.inStock : true
  };

  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
