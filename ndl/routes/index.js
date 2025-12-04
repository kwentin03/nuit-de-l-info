const express = require('express');
const router = express.Router();
const linuxController = require('../controller/NIRDController');
const { default: NIRDCONTROLLER } = require('../controller/NIRDController.js');

// Route principale
router.get('/', NIRDCONTROLLER.getHomePage);

// Route API pour exécuter les commandes
router.post('/api/command', linuxController.executeCommand);

module.exports = router;