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
router.get('/changePassword',validators.checkLanguage,(req,res)=>{
	
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/changePassword`);
	
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
	res.render(`${req.lang.langPages}/submitResponse`);

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