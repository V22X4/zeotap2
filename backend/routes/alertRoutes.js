const express = require('express');
const { registerAlert } = require('../controllers/alertController');
const router = express.Router();

// Register alert request route
router.post('/', registerAlert);

module.exports = router;
