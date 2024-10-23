const axios = require('axios');
const { saveDailySummary, checkAlerts } = require('./dataService');
const API_KEY = process.env.OPENWEATHER_API_KEY;

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
let alertStore = {}; // To keep track of consecutive high temperature alerts for each city

async function fetchWeatherData() {
  try {
    const weatherPromises = cities.map(city =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    );
    
    const responses = await Promise.all(weatherPromises);
    const weatherData = responses.map(response => response.data);

    // Process the weather data
    const dailySummary = processWeatherData(weatherData);
    
    // Save the summary to the database
    await saveDailySummary(dailySummary);
    
    // Check alerts based on the fetched data
    checkAlerts(weatherData);

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function processWeatherData(weatherData) {
  const dailySummary = {
    date: new Date().toISOString().split('T')[0],
    avgTemp: 0,
    maxTemp: -Infinity,
    minTemp: Infinity,
    dominantCondition: {}
  };

  weatherData.forEach(data => {
    const tempCelsius = data.main.temp - 273.15; // Convert from Kelvin to Celsius
    dailySummary.avgTemp += tempCelsius;
    dailySummary.maxTemp = Math.max(dailySummary.maxTemp, tempCelsius);
    dailySummary.minTemp = Math.min(dailySummary.minTemp, tempCelsius);

    // Count occurrences of each weather condition
    const condition = data.weather[0].main;
    dailySummary.dominantCondition[condition] = (dailySummary.dominantCondition[condition] || 0) + 1;
  });

  // Average temperature
  dailySummary.avgTemp /= weatherData.length;

  // Determine dominant weather condition
  dailySummary.dominantCondition = Object.keys(dailySummary.dominantCondition).reduce((a, b) => 
    dailySummary.dominantCondition[a] > dailySummary.dominantCondition[b] ? a : b, ''
);
  return dailySummary;
}

module.exports = { fetchWeatherData };
