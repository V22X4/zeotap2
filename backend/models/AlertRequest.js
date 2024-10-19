const mongoose = require('mongoose');

const alertRequestSchema = new mongoose.Schema({
  city: { type: String, required: true },
  maxTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('AlertRequest', alertRequestSchema);
