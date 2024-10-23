const WeatherSummary = require('../models/WeatherSummary');
const axios = require('axios');

const getWeatherSummaries = async (req, res) => {
  try {
    const summaries = await WeatherSummary.find();
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const fetchWeatherData = async () => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`);
    
    const weatherData = {
      date: new Date(),
      avgTemp: response.data.main.temp,
      alert: response.data.weather[0].description
    };
    
    const newSummary = new WeatherSummary(weatherData);
    await newSummary.save();
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

module.exports = {
  getWeatherSummaries,
  fetchWeatherData
};
