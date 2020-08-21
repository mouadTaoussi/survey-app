const express                         = require('express');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Authentication                  = require('.././Controllers/Authentication.js');
const Questions                       = require('.././Controllers/Questions.js');
const Responses                       = require('.././Controllers/Responses.js');
/////////////////////////////////////// GRAB THE APPROPRIATE MIDDLEWARE
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');

// Init appropriate controller
const authController = new Authentication();

// Init appropriate controller
const questionsController = new Questions();

// Init appropriate controller
const responsesController = new Responses();

// Init router
const router = express.Router();


// route    GET
// desc     render default pages or redirected to it ! ! !
router.get('/',validators.checkLanguage,(req,res)=>{

	// render the pages by language specefied
	res.render(`${req.lang.langPages}/`);
	
})


router.get('/login',validators.checkLanguage,(req,res)=>{
	// Check for error messages if exists
	const { loggedIn, message } = req.query;
	
	if (loggedIn == undefined) {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/login`,{ errMessage: null });
	}
	else if(loggedIn == 'false'){
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/login`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/login`,{ errMessage: null });
	}
})


router.get('/register',validators.checkLanguage,(req,res)=>{
	// Check for error messages if exists
	const { registered, message } = req.query;

	if (registered == undefined) {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/register`,{ errMessage: null });
	}
	else if (registered == 'false'){
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/register`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/register`,{ errMessage: null });
	}
})


router.get('/resetPassword',validators.checkLanguage,(req,res)=>{
	// Check for error messages if exists
	const { sent, message } = req.query;

	if (sent == undefined) {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/resetPassword`,{ errMessage: null });
	}
	else if (sent == 'false'){
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/resetPassword`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/resetPassword`,{ errMessage: null });
	}
})


router.get('/emailSent',validators.checkLanguage,(req,res)=>{
	// Get the email
	const { to } = req.query;
	// Check the provided language
	res.render(`${req.lang.langPages}/emailSent`,{email:to});
})


router.get('/changePassword',validators.checkLanguage, auth.isLoggedin, auth.isTokenValid, (req,res)=>{
	// Check for error messages if exists
	const { changed, message } = req.query;
	// Validation results of isTokenValid
	const { email, token } = req.nextStep;
	// http://localhost:8080/changePassword?lang=cn&token=73e24f6b-124b-4142-aa90-80e703c8bf41&email=mouadtaoussi0@gmail.com
	// Check if errors  happen
	if (changed == undefined) {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/changePassword`,{ errMessage: null,email:email,token:token });
	}
	else if (changed == 'false'){
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/changePassword`,{ errMessage: message,email:email,token:token });
	}
	else {
		// render the pages by language specefied
		res.render(`${req.lang.langPages}/changePassword`,{ errMessage: null,email:email,token:token });
	}
	
})


router.get('/dashboard',validators.checkLanguage,auth.isAuthenticated,(req,res)=>{
	
	// Use the appropriate controller
	// Logic
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/dashboard`);
	
})


router.get('/embedded',validators.checkLanguage,(req,res)=>{
	
	// Use the appropriate controller
	// Logic
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/embedded`);

})


router.get('/surveyEditor',validators.checkLanguage,auth.isAuthenticated,(req,res)=>{
	
	// Use the appropriate controller
	// Logic
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/surveyEditor`);

})


router.get('/submitResponse',validators.checkLanguage,(req,res)=>{
	
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/SubmitSurveyResponse`);

})


router.get('/thankYou',validators.checkLanguage,(req,res)=>{
	
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/thankYou`);

})


// route    GET
// desc     render error pages if something wrong happened ! ! !
router.get('/serverError',validators.checkLanguage,(req,res)=>{
	
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/serverError`);
	
})


router.get('*',(req,res)=>{
	res.render('pages/forOFor');
})






module.exports = router;