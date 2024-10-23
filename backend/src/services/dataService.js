const WeatherSummary = require('../models/WeatherSummary'); // Assuming you have a model for storing weather summaries
const Alert = require('../models/Alert');  // Correct path if models is one directory up


// Save the daily weather summary to the database
async function saveDailySummary(summary) {
  try {
    const newSummary = new WeatherSummary(summary);
    await newSummary.save();
    console.log('Daily summary saved:', summary);
  } catch (error) {
    console.error('Error saving daily summary:', error);
  }
}

// Check for alerts based on the fetched weather data
function checkAlerts(weatherData) {
  weatherData.forEach(data => {
    const tempCelsius = data.main.temp - 273.15; // Convert from Kelvin to Celsius
    if (tempCelsius > 30) {
      console.log(`ALERT! High temperature detected in ${data.name}: ${tempCelsius.toFixed(2)}°C`);

      // Save the alert to the database
      const alert = new Alert({
        city: data.name,
        temperature: tempCelsius,
        condition: data.weather[0].main,
        timestamp: new Date()
      });

      alert.save().then(() => console.log('Alert saved!')).catch(console.error);
    }
  });
}

module.exports = { saveDailySummary, checkAlerts };
