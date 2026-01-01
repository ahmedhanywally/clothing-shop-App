const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/clothing-app';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image_url: String,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// Seed Data
const seedProducts = [
  { name: 'Classic White T-Shirt', price: 29.99, image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'A timeless classic made from 100% organic cotton. Perfect for any casual occasion.' },
  { name: 'Denim Jacket', price: 89.99, image_url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Rugged and stylish denim jacket. Features a vintage wash and durable stitching.' },
  { name: 'Black Hoodie', price: 59.99, image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Comfortable and warm hoodie. Ideal for chilly evenings or layering.' },
  { name: 'Chino Pants', price: 49.99, image_url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Smart casual essential. These chinos offer a perfect fit and all-day comfort.' },
  { name: 'Running Shoes', price: 119.99, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'High-performance running shoes designed for speed and stability.' },
  { name: 'Leather Belt', price: 39.99, image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Genuine leather belt with a classic buckle. Adds a touch of sophistication to any outfit.' },
  { name: 'Summer Hat', price: 24.99, image_url: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Perfect for sunny days. Protects you from the sun while looking stylish.' },
  { name: 'Scarf', price: 34.99, image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Cozy winter accessory. Soft, warm, and available in various colors.' },
  { name: 'Sunglasses', price: 159.99, image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Protect your eyes in style. UV400 protection with a sleek modern design.' }
];

// Seed Database
const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedProducts);
      console.log('Database seeded with initial products');
    } else {
      console.log('Database already has products, skipping seed');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

// Run seed on connection
mongoose.connection.once('open', seedDatabase);

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
