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

}// http://localhost:5000/api/v1/get/surveys?api_key=2TZ9F8AXWB4G09GX2W0TYTEPVJ7H&limit=1
async function updateUserSurvey(request,response){
	// http://localhost:5000/api/v1/update/survey?survey_id=5f6df67cc7f99705148d46ca&api_key=FKCV7HJC9EMCDQMM8PTD3A87A5BN
	// localhost:5000/api/v1/get/surveys?limit=1&api_key=03BEM4W4TW430APJ2Q0DS8ZVK3KR
	// Get the survey_id 
	const { survey_id }       = request.query;

	// Get body data as well as user object
	const { body, user }      = request;

	// Validate if the user has provided all of the fields
	// if ( body.description == undefined ) {
	// 	response.status(400).json({ updated : false, message : "Provide us a description field"})
	// }
	// if ( body.title == undefined ) {
	// 	response.status(400).json({ updated : false, message : "Provide us a title field"})
	// }
	if ( body._id != survey_id ) {
		response.status(400).json({ updated : false, message : "Must not change the id of the survey: _id"})
	}
	
	if ( body.questions != undefined ){
		if ( Array.isArray(body.questions ) == false){
			response.status(400).json({ updated : false, message : "Questions field must be an array of questions! not text or number"});
		}
		else {
			// Validate if the questions fields are provided all
			for (var i = 0; i < body.questions.length; i++) {
				// Options
				if ( body.questions[i].options == undefined ){
					continue
				}
				else if ( body.questions[i].options != undefined ){
					if ( Array.isArray(body.questions[i].options) == false ){
						response.status(400).json({ updated : false, message : "Provide us some sort of options in the options field! not text or number"})
					}
				}

				// Resutls
				if ( body.questions[i].result == undefined ) {
					continue
				}
				else if ( body.questions[i].result != undefined ){
					if ( Array.isArray(body.questions[i].result) == false ){
						response.status(400).json({ updated : false, message : "result field must be an empty array! not text or number"})
					}
				}

				// Required // File // Title
				if ( body.questions[i].required == undefined ){
					continue
				}
				if ( body.questions[i].file == undefined ){
					continue
				}
				if ( body.questions[i].title == undefined ){
					continue
				}
			}	
		}
	}
	

	// Keep the user_id same as well as the survey _id 
	body.user_id   = user.id; 
	body._id       = survey_id; 

	// Update
	const updated             = await questionsController.updateSurvey(survey_id, body);

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

async function getUsers(request,response){

	// Get the limit the user wants
	const { limit }       = request.query;

	// Check the limit provided is number
	if ( isNaN( parseInt(limit) ) ) {

		response.json({
			message : "Enter a number value!!! you won't trick us!!"
		})

	}else {

		// Get the users
		const getting_users          = await authController.getMany(parseInt(limit));
		const users                  = getting_users.users;

		// // Remove the password and the API KEY
		var users_without_sensitive_fields = [];

		for ( var i = 0; i < users.length; i++ ) {

			users[i].password = undefined;
			users[i].apiKey   = undefined;

			// Push the user to the users_without_sensitive_fields array
			users_without_sensitive_fields.push(users);

		}
		
		response.json({found : true, users : users_without_sensitive_fields});
	}

}

async function updateUser(request,response){

	// // Get body data as well as user object
	const { body, user } = request;

	// Validate the fields provided by the user

	// Keep the user_id same 
	body._id = user.id;

	// // Update
	const updated             = await authController.updateUser(user_id,body);

	response.json(updated);
}

// Export all of the controllers to use in API routes
module.exports = { 
	getSurvey,    getSurveys,    updateUserSurvey, 
	deleteSurvey, getResponses, 
	getUserByID,  getUsers,      updateUser
};