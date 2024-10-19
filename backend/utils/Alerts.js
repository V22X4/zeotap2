const AlertRequest = require('../models/AlertRequest');
const { sendEmail } = require('../services/emailService');


const checkAndSendAlerts = async (city, currentTemp) => {
    const alerts = await AlertRequest.find({ city });
  
    alerts.forEach((alert) => {
      if (currentTemp > alert.maxTemp || currentTemp < alert.minTemp) {
        const subject = `⚠️ Weather Alert for ${city}`;
        const message = `The temperature in ${city} is currently ${currentTemp}°C, which exceeds your alert limits.`;
        sendEmail(alert.email, subject, message);
      }
    });
};
  
module.exports = { checkAndSendAlerts };