const WeatherSummary = require('../models/WeatherSummary');
const { fetchWeather } = require('../services/weatherService');
const { checkAndSendAlerts } = require('../utils/Alerts');

// Fetch today's latest weather data and check for alerts
const getLatestWeatherData = async (req, res) => {
  try {
    // Aggregate latest summaries for each city
    const latestSummaries = await WeatherSummary.aggregate([
      // Step 1: Sort records by city and date (latest first)
      {
        $sort: { city: 1, date: -1 },
      },
      // Step 2: Group by city to get the latest date and its corresponding records
      {
        $group: {
          _id: "$city",
          latestEntry: { $first: "$$ROOT" }, // Get the latest entry for each city
          avgTemp: { $avg: "$avgTemp" }, // Average temp for the latest date
        },
      },
      // Step 3: Project the necessary fields
      {
        $project: {
          _id: 0,
          city: "$_id",
          avgTemp: 1, // Average temp of the latest date
          currentTemp: "$latestEntry.avgTemp", // Current temp from latest entry
          date: "$latestEntry.date", // Date from the latest entry
          main: "$latestEntry.main", // Weather condition from latest entry
          maxTemp: "$latestEntry.maxTemp", // Max temp from latest entry
          minTemp: "$latestEntry.minTemp", // Min temp from latest entry
          dominantCondition: "$latestEntry.dominantCondition", // Dominant condition
        },
      },
    ]);

    // Generate alerts for cities where the average temp exceeds 35°C
    const alerts = latestSummaries
      .filter((entry) => entry.avgTemp > 35)
      .map((entry) => `⚠️ ALERT: Temperature in ${entry.city} exceeded 35°C!`);

    // Log summaries and send response
  
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

    await checkAndSendAlerts(name, temp);
  }
};

module.exports = { getLatestWeatherData, updateWeatherData };
