const express                         = require('express');
const Questions                       = require('.././Controllers/Questions.js');
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');

// Init appropriate controller
const questionsController = new Questions();

// Init router
const router = express.Router();

router.post('/:id',(request,response)=>{
	// Use the appropriate controller
	// Logic
	// Add
	questionsController.addSurvey();
	// Update
	questionsController.updateSurvey();
})
router.delete('/:id',(request,response)=>{
	// Use the appropriate controller
	// Logic
 	// Delete
 	questionsController.deleteSurvey('difbndib');
})






module.exports = router;