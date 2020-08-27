const express                         = require('express');
const Questions                       = require('.././Controllers/Questions.js');
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');
const Question                        = require('.././Models/QuestionsModel.js');

// Init appropriate controller
const questionsController = new Questions();

// Init router
const router = express.Router();

router.post('/', auth.isAuthenticated, async (request,response)=>{
	// Get the survey body
	const survey = request.body; 

	// Get the authenticated user
	const user = request.user;

	// Check if the survey already exists in the database 
	const isAlreadyExists = await Question.findById(survey.id) !== null ? true : false;

	// Attach the user id to the survey
	survey.user_id = user.id; 

	// Use the appropriate controller
	if ( isAlreadyExists === false ) {
		// Add new survey
		const savingSurveyProcess = await questionsController.addSurvey(survey);

		// Response
		response.json({
			saved : savingSurveyProcess.saved,
			message : savingSurveyProcess.message,
			survey_id : savingSurveyProcess.survey_id
		})
	}
	else {
		// Save current survey
		const savingSurveyProcess = await questionsController.updateSurvey(survey.id,survey);

		// Response
		response.json({
			saved : savingSurveyProcess.saved,
			message : savingSurveyProcess.message,
			survey_id : savingSurveyProcess.survey_id
		})
	}
	
})

router.delete('/:id',(request,response)=>{
	// Use the appropriate controller
	// Logic
 	// Delete
 	questionsController.deleteSurvey('difbndib');
})






module.exports = router;