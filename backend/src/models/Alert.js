const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  condition: String,
  timestamp: { type: Date, default: Date.now }
});

const AlertModel = mongoose.model('Alert', alertSchema);
module.exports = AlertModel;
