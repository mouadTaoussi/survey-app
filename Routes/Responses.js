const express                         = require('express');
const Responses                       = require('.././Controllers/Responses.js');
const Questions                       = require('.././Controllers/Questions.js');//
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');
const databaseConnection              = require('.././Config/DatabaseConnection.js');

// Init appropriate controller
const responsesController = new Responses();
const questionsController = new Questions();

// Init router
const router = express.Router();

router.post('/submitResponse',async (request,response)=>{
	// Use the appropriate controller
	// Logic
	response.json(await responsesController.submitResponses(request.body));
})

router.get('/processSurveyResponses', async(request,response)=>{
	// Get the queries
	const {  user_id, survey_id } = request.query;
	// Get the survey
	const questions = await questionsController.findSurvey( user_id, survey_id );
    // Get thier responses
	const responses = await responsesController.findResponses( survey_id );
	// Get the results of the survey
	const processing  = await questionsController.processSurveyResponses( questions.data, responses.data );

	// Use cash (redis) to cash the result for let user dwonload them
	// databaseConnection.set(survey_id, JSON.stringify(processing.processed),(err,result)=>{
	// 	if(err){
	// 		response.send({
	// 			processed : false,
	// 			message : "Something went wrong!"
	// 		})	
	// 	}
	// 	else {
	// 		console.log(result)
	// 	}
	// });

	// Checking ...
	if( responses.found && questions.found && processing.processed ) {

		response.send({
			processed : processing.processed,
			data :  processing.data 
		})		
	}else {
		response.send({
			processed : false,
			message :  "Something went wrong! Try again."
		})		
	}

})



router.get('/downloadResults',(request,response)=>{
	response.send("Downloading...");
	// get the result from cash to dwonload them
})






module.exports = router;