require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');
const alertRoutes = require('./routes/alertRoutes');
const { updateWeatherData } = require('./controllers/weatherController');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use weather routes
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);

// Poll the OpenWeatherMap API every 5 minutes for multiple cities
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

const pollWeatherData = () => {
  CITIES.forEach(async (city) => {
    await updateWeatherData(city);
  });
};

// Start polling at the configured interval
setInterval(pollWeatherData, INTERVAL);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
