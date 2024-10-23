import axios from 'axios';


export const fetchWeatherSummaries = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/weather/summaries');
    return response.data;
  } catch (error) {
    console.error('Error fetching weather summaries:', error);
    throw error;
  }
};

export const fetchAlerts = async () => {
  try {
    const response = await fetch('http://localhost:5005/api/weather/alerts');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

