const express                         = require('express');
const passport                        = require('passport');
const nodemailer                      = require('nodemailer');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Authentication                  = require('.././Controllers/Authentication.js');
/////////////////////////////////////// GRAB THE APPROPRIATE MIDDLEWARE
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
router.post('/login', validators.checkLanguage, auth.isLoggedin, async(req,res)=>{
	// Get the body data
	const { email, password } = req.body;
	
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
		req.session.local = user_session;
		
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		res.redirect(`/dashboard?lang=${req.lang.langShortcut}`);
	}
	else {
		// Check the language
		// render the pages by language specefied
		// Send error message
		res.redirect(`/login?lang=${req.lang.langShortcut}&loggedIn=${loginProcess.loggedIn}&message=${loginProcess.message}`)
	}

});
router.post('/register', validators.checkLanguage, auth.isLoggedin, async(req,res)=>{
	// Get  the body data
	const { firstName,givenName,username,email,password,password2 } = req.body;

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
		req.session.local = user_session;
		
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		res.redirect(`/dashboard?lang=${req.lang.langShortcut}`);
	}
	else {
		res.redirect(`/register?lang=${req.lang.langShortcut}&registered=${registerProcess.registered}&message=${registerProcess.message}`);
	}
})
router.post('/resetPassword', validators.checkLanguage, auth.isLoggedin, async(req,res)=>{
	// Grab body data
	const { email } = req.body;
	const lang = req.lang.langShortcut
	// Use the appropriate controller
	const sendingEmailProccess = await authController.resetPassword(email,lang);
	
	// Check if email was sent
	if(sendingEmailProccess.sent){
		// Redirect to sent email view
		res.redirect(`/emailSent?lang=${req.lang.langShortcut}&to=${email}`);
	}
	else {
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		res.redirect(`/resetPassword?lang=${req.lang.langShortcut}&sent=${sendingEmailProccess.sent}&message=${sendingEmailProccess.message}`);
	}
})
router.post('/changePassword', validators.checkLanguage, auth.isLoggedin, auth.isTokenValid, async(req,res)=>{
	// Get the token and email in the middleware 
	const { token,email } = req.nextStep;
	const { new_password,password2 } = req.body;

	// Use the appropriate controller // Logic
	const changingPasswordProcess = await authController.changePassword(email,token,new_password,password2);
	// Check if the password was changed
	if (changingPasswordProcess.changed){
		// Create a session
		const user_session = {
			id : registerProcess.user.id,
			email : registerProcess.user.email,
			name : registerProcess.user.name,
			avatar : registerProcess.user.avatar
		}
		// Send the session back to the browser
		req.session.local = user_session;
		
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		res.redirect(`/dashboard?lang=${req.lang.langShortcut}`);
	}
	else {
		// Check the language
		// Redirect th user to the dashboard
		// render the pages by language specefied
		res.redirect(`/changePassword?lang=${req.lang.langShortcut}&token=${token}&email=${email}&changed=${changingPasswordProcess.changed}&message=${changingPasswordProcess.message}`)
	}
})
router.get('/logout', (req,res)=>{
	req.session.destroy(function(err) {
		// cannot access session here
		res.redirect('/');
	})
})

module.exports = router;