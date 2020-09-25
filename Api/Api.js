const Questions                       = require('.././Controllers/Questions.js');
const Responses                       = require('.././Controllers/Responses.js');
const Authentication                  = require('.././Controllers/Authentication.js');


// Init appropriate controller
const questionsController = new Questions();
const responsesController = new Responses();
const authController      = new Authentication();


/**
 *
 * Surveys API (get the surveys: accessible for anyone)
 *
 **/
async function getSurvey(request,response){
	// Get the survey id from the url
	const { survey_id }   = request.query;

	const survey          = await questionsController.findSurvey( null, survey_id );

	response.json(survey);

}
async function getSurveys(request,response){

	// Get the limit the user wants
	const { limit }       = request.query;

	// Check the limit provided is number
	if ( isNaN( parseInt(limit) ) ) {

		response.json({
			message : "Enter a number value!!! you won't trick us!!"
		})

	}else {

		// Get those surveys
		const surveys         = await questionsController.findMany(parseInt(limit));

		response.json(surveys);
	}

}
async function updateUserSurvey(request,response){
	// http://localhost:5000/api/v1/update/survey?survey_id=5f6df67cc7f99705148d46ca&api_key=FKCV7HJC9EMCDQMM8PTD3A87A5BN
	// localhost:5000/api/v1/get/surveys?limit=1&api_key=03BEM4W4TW430APJ2Q0DS8ZVK3KR
	// Get the survey_id 
	console.log("query")
	console.log(request.query)
	const { survey_id }  = request.query;

	// Get body data as well as user object
	const { body, user } = request;

	// Keep the user_id same 
	body.user_id = user.id;

	// Update
	const updated             = await questionsController.updateSurvey(survey_id, body);

	// Don't change the user_id
	response.json(updated);

}
function deleteSurvey(request,response) {
	response.json({
		message : 'it works!'
	})
}

/**
 *
 * Responses API (get the responses by the survey owner: not accessible for anyone 
 * and accessible by the survey owner insted)
 *
 **/
function getResponses(request,response){

	response.json({
		message : 'it works!'
	})
}
function getResponsesBySurveyID(request,response){
	// Might be get removed ! ! !
}

/**
 *
 * Users API (get user by id - get users - update user by his own APIKEY and his 
 * id: not allowed for anyone)
 *
 **/
function getUserByID(request,response){
	response.json({
		message : 'it works!'
	})
}
function getUsers(request,response){
	response.json({
		message : 'it works!'
	})
}
function updateUser(request,response){
	response.json({
		message : 'it works!'
	})
}

// Export all of the controllers to use in API routes
module.exports = { 
	getSurvey,    getSurveys,    updateUserSurvey, 
	deleteSurvey, getResponses, 
	getUserByID,  getUsers,      updateUser
};