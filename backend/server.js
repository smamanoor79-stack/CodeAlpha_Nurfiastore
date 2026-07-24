const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://nurfiastore.vercel.app',
  'https://nurfia-ecommerce-store.vercel.app',
  'https://nurfia-adminpanel.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Nurfia Backend is running!' });
});

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.use('/images', express.static('public/images'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong' });
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
