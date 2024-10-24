const mongoose = require('mongoose');

const weatherSummarySchema = new mongoose.Schema({
  city: String,
  date: { type: Date },
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  feels_like: Number,
  dominantCondition: String
});

module.exports = mongoose.model('WeatherSummary', weatherSummarySchema);
