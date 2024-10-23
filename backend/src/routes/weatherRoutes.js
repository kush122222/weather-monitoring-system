// src/routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const { fetchWeatherData } = require('../services/weatherService');
const WeatherSummary = require('../models/WeatherSummary');
const Alert = require('../models/Alert'); // Import Alert model

// Endpoint to fetch weather data
router.get('/fetch', async (req, res) => {
  try {
    await fetchWeatherData(); // Fetch and process the weather data
    res.status(200).json({ message: 'Weather data fetched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// Endpoint to get weather summaries
router.get('/summaries', async (req, res) => {
  try {
    const summaries = await WeatherSummary.find(); // Fetch summaries from the database
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving summaries' });
  }
});

// Endpoint to get alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find(); // Fetch alerts from the database
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving alerts' });
  }
});

module.exports = router;
