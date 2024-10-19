import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../services/weatherAPI';
import WeatherCard from '../components/WeatherCard';

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getWeatherData();
      setWeatherData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="home">
      <h1>Weather Monitoring Dashboard</h1>
      <div className="weather-cards">
        {weatherData.map((weather, index) => (
          <WeatherCard key={index} {...weather} />
        ))}
      </div>
    </div>
  );
};

export default Home;
