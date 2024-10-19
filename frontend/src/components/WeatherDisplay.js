// src/components/WeatherDisplay.js
import React from 'react';
import WeatherChart from './WeatherChart';
import usePolling from '../hooks/usePolling';
import { fetchWeatherData } from '../api/weatherApi';

// src/components/WeatherDisplay.js
// src/components/WeatherDisplay.js
const WeatherDisplay = () => {
    const { data: weatherData, error } = usePolling(fetchWeatherData, 5 * 60 * 1000);
  
    console.log('Weather Data:', weatherData); // Log the structure of weatherData
  
    if (error) {
      return <div>Error fetching weather data: {error.message}</div>;
    }
  
    if (!weatherData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Weather Monitoring</h1>
        <WeatherChart weatherData={weatherData} />
      </div>
    );
  };
  

export default WeatherDisplay;
