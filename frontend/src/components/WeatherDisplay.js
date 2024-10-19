import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherChart from './WeatherChart';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alert, setAlert] = useState('');

  // Fetch latest weather data from the backend
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather/latest');
      setWeatherData(response.data.summaries);
      if (response.data.alerts.length > 0) {
        setAlert(response.data.alerts.join('\n'));
      } else {
        setAlert('');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Fetch data every 5 minutes
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h1>Latest Weather Summary</h1>
      {alert && <h2 style={{ color: 'red' }}>{alert}</h2>}
      
      {/* Weather Chart Visualization */}
      <WeatherChart weatherData={weatherData} />

      {/* You can also display the latest data in a list if needed */}
      <ul>
        {weatherData.map((entry) => (
          <li key={entry._id}>
            <strong>{entry.city}</strong>: Avg Temp: {entry.avgTemp}°C, Max Temp: {entry.maxTemp}°C, Min Temp: {entry.minTemp}°C, Condition: {entry.dominantCondition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;
