const express                         = require('express');
const Responses                       = require('.././Controllers/Responses.js');
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');

// Init appropriate controller
const responsesController = new Responses();

// Init router
const router = express.Router();

router.get('/submitResponse',(requset,response)=>{
	// Use the appropriate controller
	// Logic
	response.json(responsesController.submitResponses());
})













module.exports = router;