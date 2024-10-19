const express = require('express');
const router = express.Router();
const { getLatestWeatherData } = require('../controllers/weatherController');

// GET today's latest weather summary
router.get('/latest', getLatestWeatherData);

module.exports = router;
