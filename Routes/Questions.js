const express                         = require('express');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Questions                       = require('.././Controllers/Questions.js');
/////////////////////////////////////// GRAB THE APPROPRIATE MIDDLEWARE
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');

// Init appropriate controller
const questionsController = new Questions();

// Init router
const router = express.Router();

router.post('/:id',(req,res)=>{
	// Add
	questionsController.addSurvey();
	// Update
	questionsController.updateSurvey();
})
router.delete('/:id',(req,res)=>{
 	// Delete
 	questionsController.deleteSurvey('difbndib');
})






module.exports = router;