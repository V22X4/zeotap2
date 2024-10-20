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
  
  module.exports = { fetchWeather };
