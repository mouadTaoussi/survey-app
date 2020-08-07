const User                             = require('.././Models/UserModel.js');

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
			res.redirect(`/dashboard${req.lang.langShortcut}`);
		}
		else if (req.session.local){
			res.redirect(`/dashboard${req.lang.langShortcut}`);	
		}
		else {
			next();
		}
	},
	// This middleware comes after isAuthenticated middleware above ! ! !
	isCompletedCredentiels : async (req,res,next)=>{
		// Info about user's account
		const info =  [];
		// Validate thier credentiels
		if (!req.user.email){
			info.push('Provide us your email!')
			console.log(1)
		}
		else if (!req.user.username){
			info.push('Provide us your username!')
			console.log(2)
		}
		else if (!req.user.fullName){
			info.push('Provide us your full name!')
			console.log(3)
		}
		req.info = info;
		next();
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