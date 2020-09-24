const User                             = require('.././Models/UserModel.js');
const Questions                        = require('.././Models/QuestionsModel.js');
const ResetPasswordToken               = require('.././Models/ResetPasswordToken.js');

module.exports = {
	// You know this middleware what could do, so no explanation required !! !! !! 
	isAuthenticated : async (request,response,next)=>{
		if (request.session.passport){
			const user = await User.findOne({ 
				atProviderId : request.session.passport.user.atProviderId 
			});
			request.user = user;
			next();
		}
		else if (request.session.local){
			try {
				const user = await User.findById( request.session.local.id );
				request.user = user;
				next();	
			}
			catch (err){
				// Render server error
			}
		}
		else {
			response.redirect(`/login?lang=${request.lang.langShortcut}`);
		}
	},
	// This middleware check the user logged in for prevent him to access login page ! ! !
	isLoggedin : (request,response,next)=>{
		if (request.session.passport){
			response.redirect(`/dashboard?lang=${request.lang.langShortcut}`);
		}
		else if (request.session.local){
			response.redirect(`/dashboard?lang=${request.lang.langShortcut}`);	
		}
		else {
			next();
		}
	},
	// This middleware comes after isAuthenticated middleware above ! ! !
	isCompletedCredentiels : async (request,response,next)=>{
		// Info about user's account
		const info =  [];

		// Validate thier credentiels
		if (request.user.email === null || request.user.email === '' ){
			info.push('Provide us your email!')
		}
	    if (request.user.username === null || request.user.username === '' ){
			info.push('Provide us your username!')
		}
		if (request.user.fullName.familyName === null || request.user.fullName.familyName === '' ){
			info.push('Provide us your family name!')
		}
		if (request.user.fullName.givenName === null || request.user.fullName.givenName === '' ){
			info.push('Provide us your given name!')
		}
		request.info = info;
		next();
	},
	// This middleware checks if a forgotten password token provided is valid or exists ! ! !
	isTokenValid : async (request,response,next)=>{
		// Get the token in the query
		const { token, email } = request.query;
		
		try {
			// Grab that token in the database
			const getToken = await ResetPasswordToken.findOne({token:token});
			
			// Check if token exists
			if (!getToken){
				response.redirect(`/resetPassword?lang=${request.lang.langShortcut}`);
			}
			else {
				// Get the user related to this token and compare it with the email provided
				const getUser = await User.findById(getToken.user_id);

				if (email === getUser.email){
					request.nextStep = { email : getUser.email, token : token };
					next()
				}
				else {
					response.redirect(`/resetPassword?lang=${request.lang.langShortcut}`);
				}
			}
		}
		catch(err){
			// Render err page
		}
	},
	// This middleware used in API routes to authenticate users to consume the resources of it
	validateAPIKEY : async (request,response,next)=>{

		const { api_key } = request.query;

		// Check if the api key provided
		if ( api_key === undefined || api_key === null ) {

			response.json({
				message : "API KEY required"
			})

		}
		else {
			
			// Get the user related to this apiKey
			const getUser = await User.findOne({ apiKey : api_key });
		
			// Check if the apiKEY owner exists
			if( getUser !== null ) {

				// Attach the API_KEY owner data to the request object
				request.user = getUser;
				// Next
				next();

			}else {
				response.json({ message : "API KEY invalid" });
			}
		}
		
	},
	// Comes after the above middleware <validateAPIKEY> for get the user from it, and check it if ownes the survey
	isOwenedTheSurvey : async (request,response,next)=>{

		// TAKES THE USER_ID AND THE APIKEY
		const { user }       = request;
		const { survey_id }  = request.query;

		// Find the survey from the database
		const survey = await Questions.findOne({ survey_id: survey_id }); 

		// Compare its user_id to the user id 
		if (survey === null) {
			response.json({message: "No survey with that ID."});
		}
		else {
			if (survey.user_id === user.id){
				next();
			}
			else {
				response.json({message: "You are not authorized to make changes on that survey!"})
			}
		}

	}
}

// {
//   "provider": "google",
//   "_id": "5f206744f5a4602b20916c5b",
//   "atProviderId": "113678035215783638212",
//   "name": "MOUAADT",
//   "fullName": {
//     "_id": "5f206744f5a4602b20916c5c",
//     "givenName": "MOUAADT"
//   },
//   "email": "mouadtaoussi5@gmail.com",
//   "avatar": "https://lh3.googleusercontent.com/a-/AOh14Gh7sEdbxa7dM2ke_cCUL28KBNyALq3lhJ-P6z7B_w",
//   "__v": 0
// }