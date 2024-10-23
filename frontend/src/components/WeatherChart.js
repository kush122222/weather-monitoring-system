import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const WeatherChart = ({ weatherData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Average Temperature (°C)',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    if (weatherData.length > 0) {
      const dates = weatherData.map(item => new Date(item.date).toLocaleDateString());
      const temperatures = weatherData.map(item => item.avgTemp);

      setChartData({
        labels: dates,
        datasets: [
          {
            ...chartData.datasets[0], // Retain other dataset properties
            data: temperatures,
          },
        ],
      });
    }
  }, [weatherData]);

  if (!weatherData || weatherData.length === 0) {
    return <p>No weather data available.</p>;
  }

  return (
    <div>
      <h2>Daily Weather Summaries</h2>
      <Line data={chartData} />
    </div>
  );
};

// Add prop validation using PropTypes
WeatherChart.propTypes = {
  weatherData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,  // Ensure 'date' is a string
      avgTemp: PropTypes.number.isRequired, // Ensure 'avgTemp' is a number
    })
  ).isRequired,  // Ensure weatherData is an array and is required
};

export default WeatherChart;
