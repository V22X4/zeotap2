// src/components/WeatherChart.js
import React from 'react';
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

// Registering necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const WeatherChart = ({ weatherData }) => {
    console.log("Weather Data:", weatherData); // Log the weather data for debugging
  
    // Check if weatherData and summaries exist and are in the correct format
    if (!weatherData || !weatherData.summaries || !Array.isArray(weatherData.summaries)) {
      return <p>No valid data available.</p>; // Handle invalid data case
    }
  
    // Extract temperatures and city names from weatherData.summaries
    const temperatures = weatherData.summaries.map(data => data.avgTemp);
    const cities = weatherData.summaries.map(data => data.city);
  
    const chartData = {
      labels: cities, // Use city names as labels
      datasets: [
        {
          label: 'Average Temperature (°C)',
          data: temperatures,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    };
  
    return (
      <div>
        <h2>Weather Summary</h2>
        <Line data={chartData} />
      </div>
    );
  };

export default WeatherChart;
