const express = require('express');
const { registerAlert, getTriggeredAlerts } = require('../controllers/alertController');
const router = express.Router();

// Register alert request route
router.post('/', registerAlert);
router.get('/triggered', getTriggeredAlerts);

module.exports = router;
