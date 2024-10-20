const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: { type: String, required: true },
  alertTemp: { type: Number, required: true },
  minTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  email: { type: String, required: true },
  triggered: { type: Boolean, default: false },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
