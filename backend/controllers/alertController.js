const AlertRequest = require('../models/AlertRequest');

// Register a new alert request
const registerAlert = async (req, res) => {
  try {
    const { city, maxTemp, minTemp, email } = req.body;
    await AlertRequest.create({ city, maxTemp, minTemp, email });
    res.status(201).send('Alert request registered successfully.');
  } catch (error) {
    console.error('Error registering alert request:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = { registerAlert };
