require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const weatherRoutes = require('./routes/weatherRoutes'); // Import weather routes
const { fetchWeatherData } = require('./services/weatherService'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5005;

// Enable CORS for all origins or specify the frontend origin (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000'  // or use '*' to allow all origins
}));

app.use(express.json()); // Middleware to parse JSON

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Use the weather routes
app.use('/api/weather', weatherRoutes); // Register weather routes

// Check if fetchWeatherData is defined
console.log('fetchWeatherData:', fetchWeatherData); // This should not be undefined

// Schedule weather data fetching every 5 minutes
setInterval(fetchWeatherData, 5 * 60 * 1000); // Run fetchWeatherData every 5 minutes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Initial call to fetchWeatherData on startup
fetchWeatherData();
