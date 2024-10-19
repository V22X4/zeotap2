import React from 'react';

const WeatherCard = ({ city, avgTemp, maxTemp, minTemp, dominantCondition }) => (
  <div className="weather-card">
    <h3>{city}</h3>
    <p>Avg Temp: {avgTemp}°C</p>
    <p>Max Temp: {maxTemp}°C</p>
    <p>Min Temp: {minTemp}°C</p>
    <p>Condition: {dominantCondition}</p>
  </div>
);

export default WeatherCard;
