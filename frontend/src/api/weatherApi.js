// src/api/weatherApi.js
export const fetchWeatherData = async () => {
  const response = await fetch('http://localhost:5000/api/weather/latest'); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };
  