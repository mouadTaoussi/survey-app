const express                         = require('express');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Responses                       = require('.././Controllers/Responses.js');
/////////////////////////////////////// GRAB THE APPROPRIATE MIDDLEWARE
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');

// Init appropriate controller
const responsesController = new Responses();

// Init router
const router = express.Router();

router.get('/submitResponse',(req,res)=>{
	// Use the appropriate controller
	// Logic
	res.json(responsesController.submitResponses());
})













module.exports = router;