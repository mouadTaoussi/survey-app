const express                         = require('express');
const Responses                       = require('.././Controllers/Responses.js');
const Questions                       = require('.././Controllers/Questions.js');//
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');

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




router.get('/find', async(request,response)=>{
	const responses = await responsesController.findResponses(request.query.qid);
	const questions = await questionsController.findSurvey( null, request.query.qid )
	const processed  = await questionsController.processSurveyResponses(questions.data,responses.data)

	response.send(processed)
})








module.exports = router;