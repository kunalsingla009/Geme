const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Optional: only if you're using .env

const app = express();
const PORT = process.env.PORT || 10000;

// MongoDB connection (make sure MONGO_URI is set in Render Environment)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Serve static files from public/

// MongoDB Schema
const Result = require('./models/Result'); // ✅ Adjusted path to model

// ✅ Route: Home — serves semi.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'semi.html'));
});

// ✅ Route: Admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ✅ Route: Results page
app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

// ✅ API to fetch results (Optional based on your logic)
app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
