const WeatherSummary = require("../models/WeatherSummary");
const { fetchWeather } = require("../services/weatherService");
const { kelvinToCelsius } = require("../utils/convertTemp");

const CITIES = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

async function getWeatherData(req, res) {
  try {
    const weatherPromises = CITIES.map((city) => fetchWeather(city));
    const weatherData = await Promise.all(weatherPromises);

    const summaries = weatherData.map((data) => ({
      city: data.name,
      date: new Date(data.dt * 1000).toLocaleDateString(),
      avgTemp: kelvinToCelsius(data.main.temp),
      maxTemp: kelvinToCelsius(data.main.temp_max),
      minTemp: kelvinToCelsius(data.main.temp_min),
      dominantCondition: data.weather[0].main,
    }));

    await WeatherSummary.insertMany(summaries);
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
}

module.exports = { getWeatherData };
