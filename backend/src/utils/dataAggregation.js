function processWeatherData(weatherData) {
    const dailySummary = {
      date: new Date().toISOString().split('T')[0],
      avgTemp: 0,
      maxTemp: -Infinity,
      minTemp: Infinity,
      dominantCondition: {}
    };
  
    weatherData.forEach(data => {
      const tempCelsius = data.main.temp - 273.15; // Convert Kelvin to Celsius
      dailySummary.avgTemp += tempCelsius;
      dailySummary.maxTemp = Math.max(dailySummary.maxTemp, tempCelsius);
      dailySummary.minTemp = Math.min(dailySummary.minTemp, tempCelsius);
  
      const condition = data.weather[0].main;
      dailySummary.dominantCondition[condition] = (dailySummary.dominantCondition[condition] || 0) + 1;
    });
  
    dailySummary.avgTemp /= weatherData.length;
  
    dailySummary.dominantCondition = Object.keys(dailySummary.dominantCondition).reduce((a, b) => 
      dailySummary.dominantCondition[a] > dailySummary.dominantCondition[b] ? a : b
    );
  
    return dailySummary;
  }
  
  async function saveDailySummary(summary) {
    // Code to save summary to MongoDB
    // You can use your Mongoose model here to save the daily summary
  }
  
  function checkAlerts(weatherData) {
    // Implement alert checking logic based on thresholds
  }
  
  module.exports = { processWeatherData, saveDailySummary, checkAlerts };
  