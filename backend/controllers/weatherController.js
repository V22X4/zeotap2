const WeatherSummary = require('../models/WeatherSummary');
const { fetchWeather } = require('../services/weatherService');

// Fetch today's latest weather data and check for alerts
const getLatestWeatherData = async (req, res) => {
  try {
    // Fetch latest weather data for each city
    const latestSummaries = await WeatherSummary.aggregate([
      {
        $group: {
          _id: "$city",
          latestSummary: { $last: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latestSummary" }
      }
    ]);

    // Check for alerts
    const alerts = latestSummaries
      .filter(entry => entry.avgTemp > 35)
      .map(entry => `⚠️ ALERT: Temperature in ${entry.city} exceeded 35°C!`);

    res.json({ summaries: latestSummaries, alerts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update weather data for cities
const updateWeatherData = async (city) => {
  const weather = await fetchWeather(city);
  if (weather) {
    const { name, main, weather: weatherDetails, dt } = weather;

    const temp = (main.temp - 273.15).toFixed(2);
    const maxTemp = (main.temp_max - 273.15).toFixed(2);
    const minTemp = (main.temp_min - 273.15).toFixed(2);
    const dominantCondition = weatherDetails[0].main;

    // Save the weather summary to the database
    await WeatherSummary.create({
      city: name,
      date: new Date(dt * 1000).toLocaleDateString(),
      avgTemp: temp,
      maxTemp,
      minTemp,
      dominantCondition
    });
  }
};

module.exports = { getLatestWeatherData, updateWeatherData };
