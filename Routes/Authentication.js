const express                         = require('express');
const passport                        = require('passport');
const nodemailer                      = require('nodemailer');
const Authentication                  = require('.././Controllers/Authentication.js');
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');

// Init appropriate controller
const authController = new Authentication();

// Init router
const router = express.Router();

// Oauth routes to get user logged in!
router.get('/google', auth.isLoggedin, passport.authenticate('google',{scope:['profile','email']}));
router.get('/github', auth.isLoggedin, passport.authenticate('github',{scope:['profile','email']}));
router.get('/linkedin', auth.isLoggedin, passport.authenticate('linkedin'));

// Callbacks or Oauth services to get user redirected to!
router.get('/google/callback',passport.authenticate('google',{failureRedirect : '/',successRedirect : '/dashboard'}));
router.get('/github/callback',passport.authenticate('github',{failureRedirect : '/',successRedirect : '/dashboard'}));
router.get('/linkedin/callback',passport.authenticate('linkedin',{failureRedirect : '/',successRedirect : '/dashboard'}));

// Local Authentication Strategy
router.post('/login', validators.checkLanguage, auth.isLoggedin, async(request,response)=>{
	// Get the body data
	const { email, password } = request.body;
	
	// Use the appropriate controller
	const loginProcess = await authController.login(email,password);

	if (loginProcess.loggedIn){
		// Create a session
		const user_session = {
			id : loginProcess.user.id,
			email : loginProcess.user.email,
			name : loginProcess.user.name,
			avatar : loginProcess.user.avatar
		}
		// Send the session back to the browser
		request.session.local = user_session;
		
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		response.redirect(`/dashboard?lang=${request.lang.langShortcut}`);
	}
	else {
		// Check the language
		// render the pages by language specefied
		// Send error message
		response.redirect(`/login?lang=${request.lang.langShortcut}&loggedIn=${loginProcess.loggedIn}&message=${loginProcess.message}`)
	}

});
router.post('/register', validators.checkLanguage, auth.isLoggedin, async(request,response)=>{
	// Get  the body data
	const { firstName,givenName,username,email,password,password2 } = request.body;

	// Use the appropriate controller
	const registerProcess = await authController.register(firstName,givenName,username,email,password,password2);
	// Check user if registered 
	if (registerProcess.registered){
		// Create a session
		const user_session = {
			id : registerProcess.user.id,
			email : registerProcess.user.email,
			name : registerProcess.user.name,
			avatar : registerProcess.user.avatar
		}
		// Send the session back to the browser
		request.session.local = user_session;
		
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		response.redirect(`/dashboard?lang=${request.lang.langShortcut}`);
	}
	else {
		response.redirect(`/register?lang=${request.lang.langShortcut}&registered=${registerProcess.registered}&message=${registerProcess.message}`);
	}
})
router.post('/resetPassword', validators.checkLanguage, auth.isLoggedin, async(request,response)=>{
	// Grab body data
	const { email } = request.body;
	const lang = request.lang.langShortcut
	// Use the appropriate controller
	const sendingEmailProccess = await authController.resetPassword(email,lang);
	
	// Check if email was sent
	if(sendingEmailProccess.sent){
		// Redirect to sent email view
		response.redirect(`/emailSent?lang=${request.lang.langShortcut}&to=${email}`);
	}
	else {
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		response.redirect(`/resetPassword?lang=${request.lang.langShortcut}&sent=${sendingEmailProccess.sent}&message=${sendingEmailProccess.message}`);
	}
})
router.post('/changePassword', validators.checkLanguage, auth.isLoggedin, auth.isTokenValid, async(request,response)=>{
	// Get the token and email in the middleware 
	const { token,email } = request.nextStep;
	const { new_password,password2 } = request.body;

	// Use the appropriate controller // Logic
	const changingPasswordProcess = await authController.changePassword(email,token,new_password,password2);
	// Check if the password was changed
	if (changingPasswordProcess.changed){
		// Create a session
		const user_session = {
			id : changingPasswordProcess.user.id,
			email : changingPasswordProcess.user.email,
			name : changingPasswordProcess.user.name,
			avatar : changingPasswordProcess.user.avatar
		}
		// Send the session back to the browser
		request.session.local = user_session;
		
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		response.redirect(`/dashboard?lang=${request.lang.langShortcut}`);
	}
	else {
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		response.redirect(`/changePassword?lang=${request.lang.langShortcut}&token=${token}&email=${email}&changed=${changingPasswordProcess.changed}&message=${changingPasswordProcess.message}`)
	}
})
router.post('/updateUser', auth.isAuthenticated, async (request,response)=>{
	// Get body data
	const bodyData = request.body;
	// Get the user id based on session
	const user_id = request.user.id;
	// Procce the request within the appropriate controller
	const updatingUserProcess = await authController.updateUser(user_id,bodyData); 
	// Send the proccess result
	response.json({
		message : updatingUserProcess.message,
		updated : updatingUserProcess.updated 
	})
})
router.get('/logout', (request,response)=>{
	request.session.destroy(function(err) {
		// cannot access session here
		response.redirect('/');
	})
})
router.get('/getFirebaseConfig',auth.isAuthenticated,(request,response)=>{
	// send the firebase config to the client 
	response.json({
		apiKey : process.env.FIREBASE_API_KEY,
	 	authDomain : process.env.FIREBASE_AUTH_DOMAIN,
	 	databaseURL : process.env.FIREBASE_DATABASE_URL,
	 	storageBucket : process.env.FIREBASE_STORAGE_BUCKET,
	 	projectId : process.env.FIREBASE_PROJECT_ID
	})
})

module.exports = router;