const AlertRequest = require('../models/AlertRequest');
const Alert = require('../models/Alert');
const { sendEmail } = require('../services/emailService');

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

// Fetch all triggered alerts for a specific email
const getTriggeredAlerts = async (req, res) => {
    try {
        const { email } = req.query;
        console.log(email)
      const alerts = await Alert.find({ email });
      res.json(alerts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch alerts' });
    }
};

const checkAlertsAndNotify = async (name, temp, date) => {
    try {
        const alerts = await AlertRequest.find({ city: name });
  
        for (const alert of alerts) {
            
            if (temp > alert.maxTemp || temp < alert.minTemp) {
                const message = `⚠️ ALERT: Temperature in ${name} exceeded thresholds!\nCurrent Temp: ${temp}°C at ${date}`;
                await sendEmail(alert.email, 'Temperature Alert', message).then(async() => {
                    // Mark the alert as triggered and store the message
                    await Alert.create({ email: alert.email, city: name, message, maxTemp: alert.maxTemp, minTemp: alert.minTemp,  alertTemp : temp});
                });

            }
          }
          
    } catch (err) {
      console.error('Error checking alerts:', err);
    }
};
  

module.exports = { registerAlert, getTriggeredAlerts, checkAlertsAndNotify };
