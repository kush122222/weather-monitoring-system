const mongoose = require('mongoose');

const weatherSummarySchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    condition: String,
    timestamp: Date
});

const WeatherSummary = mongoose.model('WeatherSummary', weatherSummarySchema);

module.exports = WeatherSummary;
