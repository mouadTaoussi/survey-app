const User                             = require('.././Models/UserModel.js');
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
		console.log(request.user)
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
	validateAPIKEY : (request,response)=>{

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