const User                             = require('.././Models/UserModel.js');
const ResetPasswordToken               = require('.././Models/ResetPasswordToken.js');

module.exports = {
	// You know this middleware what could do, so no explanation required !! !! !! 
	isAuthenticated : async (req,res,next)=>{
		if (req.session.passport){
			const user = await User.findOne({ 
				atProviderId : req.session.passport.user.atProviderId 
			});
			req.user = user;
			next();
		}
		else if (req.session.local){
			try {
				const user = await User.findById( req.session.local.id );
				req.user = user;
				next();	
			}
			catch (err){
				// Render server error
			}
		}
		else {
			res.redirect(`/login?lang=${req.lang.langShortcut}`);
		}
	},
	// This middleware check the user logged in for prevent him to access login page ! ! !
	isLoggedin : (req,res,next)=>{
		if (req.session.passport){
			res.redirect(`/dashboard?lang=${req.lang.langShortcut}`);
		}
		else if (req.session.local){
			res.redirect(`/dashboard?lang=${req.lang.langShortcut}`);	
		}
		else {
			next();
		}
	},
	// This middleware comes after isAuthenticated middleware above ! ! !
	isCompletedCredentiels : async (req,res,next)=>{
		// Info about user's account
		const info =  [];
		console.log(req.user)
		// Validate thier credentiels
		if (req.user.email === null || req.user.email === '' ){
			info.push('Provide us your email!')
		}
	    if (req.user.username === null || req.user.username === '' ){
			info.push('Provide us your username!')
		}
		if (req.user.fullName.familyName === null || req.user.fullName.familyName === '' ){
			info.push('Provide us your family name!')
		}
		if (req.user.fullName.givenName === null || req.user.fullName.givenName === '' ){
			info.push('Provide us your given name!')
		}
		req.info = info;
		next();
	},
	// This middleware checks if a forgotten password token provided is valid or exists ! ! !
	isTokenValid : async (req,res,next)=>{
		// Get the token in the query
		const { token, email } = req.query;
		
		try {
			// Grab that token in the database
			const getToken = await ResetPasswordToken.findOne({token:token});
			
			// Check if token exists
			if (!getToken){
				res.redirect(`/resetPassword?lang=${req.lang.langShortcut}`);
			}
			else {
				// Get the user related to this token and compare it with the email provided
				const getUser = await User.findById(getToken.user_id);

				if (email === getUser.email){
					req.nextStep = { email : getUser.email, token : token };
					next()
				}
				else {
					res.redirect(`/resetPassword?lang=${req.lang.langShortcut}`);
				}
			}
		}
		catch(err){
			// Render err page
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