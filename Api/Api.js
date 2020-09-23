/**
 *
 * Surveys API (get the surveys: accessible for anyone)
 *
 **/
function getSurvey(request,response){
	response.json({
		message : 'it works!';
	})
}
function getSurveys(request,response){
	response.json({
		message : 'it works!';
	})
}
function updateSurvey(request,response){
	response.json({
		message : 'it works!';
	})
}
function deleteSurvey(request,response)

/**
 *
 * Responses API (get the responses by the survey owner: not accessible for anyone)
 *
 **/
function getResponse(request,response){
	response.json({
		message : 'it works!';
	})
}
function getResponsesBySurveyID(request,response){
	response.json({
		message : 'it works!';
	})
}

/**
 *
 * Users API (get user by id - get users - update user by his own APIKEY and his id: not allowed for anyone)
 *
 **/
function getUserByID(request,response){
	response.json({
		message : 'it works!';
	})
}
function getUsers(request,response){
	response.json({
		message : 'it works!';
	})
}
function updateUser(request,response){
	response.json({
		message : 'it works!';
	})
}


module.exports = { 
	getSurvey,    getSurveys,    updateSurvey, 
	deleteSurvey, getResponse,   getResponsesBySurveyID, 
	getUserByID,  getUsers,      updateUser
};