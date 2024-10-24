const WeatherSummary = require('../models/WeatherSummary');
const { fetchWeather } = require('../services/weatherService');
const { checkAlertsAndNotify } = require('./alertController');

// Fetch today's latest weather data and check for alerts
const getLatestWeatherData = async (req, res) => {
  try {
    // Aggregate latest summaries for each city
    const latestSummaries = await WeatherSummary.aggregate([
      // Step 1: Sort by city and date to get latest entries for each city
      { $sort: { city: 1, date: -1 } },

      // Step 2: Group by city to get the latest date for each city
      {
        $group: {
          _id: "$city",
          latestDate: { $first: "$date" },  // Latest date entry
          latestEntry: { $first: "$$ROOT" } // Store the whole latest document
        }
      },

      // Step 3: Lookup all records of the latest date for each city
      {
        $lookup: {
          from: "weathersummaries", // Collection name (usually lowercase + plural)
          let: { city: "$_id", latestDate: "$latestDate" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$city", "$$city"] },
                    { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$date" } }, { $dateToString: { format: "%Y-%m-%d", date: "$$latestDate" } }] }
                  ]
                }
              }
            }
          ],
          as: "latestDayRecords"
        }
      },

      // Step 4: Unwind the latestDayRecords to calculate max, min, avgTemp
      { $unwind: "$latestDayRecords" },

      // Step 5: Group by city again to calculate stats for the latest date
      {
        $group: {
          _id: "$_id",
          latestEntry: { $first: "$latestEntry" },
          maxTemp: { $max: "$latestDayRecords.maxTemp" },
          minTemp: { $min: "$latestDayRecords.minTemp" },
          avgTemp: { $avg: "$latestDayRecords.avgTemp" },
        }
      },

      // Step 6: Format the output
      {
        $project: {
          _id: 0,
          city: "$_id",
          currentTemp: "$latestEntry.avgTemp",
          date: "$latestEntry.date",
          main: "$latestEntry.dominantCondition",
          feels_like:  "$latestEntry.feels_like",
          maxTemp: 1,
          minTemp: 1,
          avgTemp: 1,
          dominantCondition: "$latestEntry.dominantCondition"
        }
      }
    ]);

  
    res.json({ summaries: latestSummaries});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


// Update weather data for cities
const updateWeatherData = async (city) => {
  const weather = await fetchWeather(city);
  if (weather) {
    const { name, main, weather: weatherDetails, dt} = weather;

    const temp = (main.temp - 273.15).toFixed(2);
    const maxTemp = (main.temp_max - 273.15).toFixed(2);
    const minTemp = (main.temp_min - 273.15).toFixed(2);
    const dominantCondition = weatherDetails[0].main;
    const date = new Date(dt * 1000);
    const  feels_like = (main.feels_like - 273.15).toFixed(2);
    // Save the weather summary to the database
    await WeatherSummary.create({
      city: name,
      date: date, 
      avgTemp: temp,
      maxTemp,
      minTemp,
      feels_like,
      dominantCondition,
    });
    

    await checkAlertsAndNotify(name, temp, date);
  }
};

module.exports = { getLatestWeatherData, updateWeatherData };
