const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;


async function fetchWeather(city) {
    try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
  }
}

// async function aggregateWeatherData(date) {
//     const summaries = await WeatherSummary.find({ date });
  
//     const avgTemp = (
//       summaries.reduce((sum, entry) => sum + entry.avgTemp, 0) / summaries.length
//     ).toFixed(2);
  
//     const maxTemp = Math.max(...summaries.map(entry => entry.maxTemp));
//     const minTemp = Math.min(...summaries.map(entry => entry.minTemp));
  
//     const dominantCondition = summaries
//       .map(entry => entry.dominantCondition)
//       .reduce((prev, curr, _, arr) =>
//         arr.filter(c => c === prev).length >= arr.filter(c => c === curr).length ? prev : curr
//       );
  
//     console.log(`Daily Summary for ${date}: Avg: ${avgTemp}°C, Max: ${maxTemp}°C, Min: ${minTemp}°C, Condition: ${dominantCondition}`);
//     return { avgTemp, maxTemp, minTemp, dominantCondition };
//   }
  
  module.exports = { fetchWeather };
