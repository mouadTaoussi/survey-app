const express                         = require('express');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Responses                       = require('.././Controllers/Responses.js');

// Init appropriate controller
const responsesController = new Responses();

// Init router
const router = express.Router();













module.exports = router;