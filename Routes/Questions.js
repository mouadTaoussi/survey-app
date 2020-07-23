const express                         = require('express');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Questions                       = require('.././Controllers/Questions.js');

// Init appropriate controller
const questionsController = new Questions();

// Init router
const router = express.Router();













module.exports = router;