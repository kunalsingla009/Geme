const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Load .env file if used locally

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Connect to MongoDB using MONGODB_URI (set in Render environment)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files like HTML, CSS, JS

// ✅ MongoDB Schema
const Result = require('./models/Result'); // Schema for results

// ✅ Home Route (semi.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'semi.html'));
});

// ✅ Admin Dashboard (admin.html)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ✅ Result Page (result.html)
app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

// ✅ Optional API Endpoint to fetch results (for AJAX if needed)
app.get('/api/results', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// ✅ Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
