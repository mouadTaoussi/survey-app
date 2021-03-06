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

	// Get the survey_id 
	const { survey_id }       = request.query;

	// Get body data as well as user object
	const { body, user }      = request;

	// Validate if the user has provided correct fields
	if ( body._id != survey_id ) {
		response.status(400).json({ updated : false, message : "Must not change the id of the survey: _id"})
	}

	if ( body.questions != undefined ){

		// Check if the options is array
		if ( Array.isArray(body.questions ) == false){

			// End the process with 400 status code : Bad request
			response.status(400).json({ updated : false, 
				message : "Questions field must be an array of questions! not text or number"
			});
		}
		else {
			// Validate if the questions fields are provided all
			for (var i = 0; i < body.questions.length; i++) {
		
				// Options
				if ( body.questions[i].options == undefined ){ continue }

				else if ( body.questions[i].options != undefined ){

					// Check if the options is array
					if ( Array.isArray(body.questions[i].options) == false ){

					// Make it modified so we won't push it to the database
					body.questions[i].options = undefined;

					// End the process with 400 status code : Bad request
					response.status(400).json({ updated : false,
						message : "Provide us some sort of options in the options field! not text or number"
					})

					}
				}

				// Results
				if ( body.questions[i].result == undefined ) { continue }

				else if ( body.questions[i].result != undefined ){

					// Check if the result is array
					if ( Array.isArray(body.questions[i].result) == false ){

					// Make it modified so we won't push it to the database
					body.questions[i].result = undefined;

					// End the process with 400 status code : Bad request
					response.status(400).json({ updated : false, 
						message : "result field must be an empty array! not text or number"
					})

					}
				}

				// Required // File // Title
				if ( body.questions[i].required == undefined ){ continue }

				if ( body.questions[i].file == undefined ){ continue }

				if ( body.questions[i].title == undefined ){ continue }
			}	
		}
	}
	

	// Keep the user_id same as well as the survey _id 
	body.user_id   = user.id; 
	body._id       = survey_id; 

	// Update
	const updated             = await questionsController.updateSurvey(survey_id, body);
	
	// const profile = await Profile.findByIdAndUpdate(req.params.id, 
 //    { $set: { 'settings.darkMode': req.body.darkMode } }, 
 //     {
 //        new: true,
 //        runValidators: true
 //    });

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

// async function updateUser(request,response){

// 	// // Get body data as well as user object
// 	const { body, user } = request;
// 	const { user_id }    = request.query;
// 	console.log(user)
// 	// If authorized to update
// 	if ( user_id != user._id ){
// 		response.status(401).json({message: "You are not authorized to make changes on that user!"});
// 	}
// 	else {
// 		// Validate the fields provided by the user

// 		// Keep the user_id same 
// 		body._id = user.id;

// 		// // Update
// 		const updated             = await authController.updateUser(user_id,body);

// 		response.json(updated);
// 	}
// }

// Export all of the controllers to use in API routes
module.exports = { 
	getSurvey,    getSurveys,    updateUserSurvey, 
	deleteSurvey, getResponses, 
	getUserByID,  getUsers,      /*updateUser*/
};