const express                         = require('express');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Responses                       = require('.././Controllers/Responses.js');

// Init appropriate controller
const responsesController = new Responses();

// Init router
const router = express.Router();

router.get('/submitResponse',(req,res)=>{
	res.json(responsesController.submitResponses());
})













module.exports = router;