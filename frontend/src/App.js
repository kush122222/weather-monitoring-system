import React, { useEffect, useState } from 'react';
import WeatherChart from './components/WeatherChart';
import AlertsTable from './components/AlertsTable';
import { fetchWeatherSummaries } from './services/apiService';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const weatherSummaries = await fetchWeatherSummaries();
        setWeatherData(weatherSummaries);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p className="error-message">{error}</p>;
  } else {
    content = (
      <>
        <WeatherChart weatherData={weatherData} />
        <AlertsTable /> {/* Rendering AlertsComponent */}
      </>
    );
  }

  return (
    <div className="App">
      <h1>Weather Monitoring Dashboard</h1>
      {content}
    </div>
  );
};

export default App;
