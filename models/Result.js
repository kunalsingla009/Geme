const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  game: { type: String, required: true },
  result: { type: String, required: true },
  day: Number,
  month: Number,
  year: Number
});

module.exports = mongoose.model('Result', resultSchema);
