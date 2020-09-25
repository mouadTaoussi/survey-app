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
async function deleteSurvey(request,response) {
	// Get the survey_id 
	const { survey_id }  = request.query;

	// Get body data as well as user object
	const { user } = request;

	// Delete
	const deleted             = await questionsController.deleteSurvey(survey_id);

	// Don't change the user_id
	response.json(deleted);
}

/**
 *
 * Responses API (get the responses by the survey owner: not accessible for anyone 
 * and accessible by the survey owner instead)
 *
 **/
async function getResponses(request,response){
	// Get the survey_id 
	const { survey_id }  = request.query;

	const responses          = await responsesController.findResponses( survey_id );

	response.json(responses);
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
async function getUserByID(request,response){
	// Get the user id from the url
	const { user_id }   = request.query;

	const user          = await authController.getUser( user_id );
	// Remove the password and the API KEY
	user.user.password  = undefined;
	user.user.apiKey    = undefined;
	// user
	response.json(user);

}
function getUsers(request,response){
	// const user          = await authController.getUser( user_id );
	// // Remove the password and the API KEY
	// user.user.password  = undefined;
	// user.user.apiKey    = undefined;
	// // user
	// response.json(user);
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