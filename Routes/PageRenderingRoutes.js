const express                         = require('express');
const Authentication                  = require('.././Controllers/Authentication.js');
const Questions                       = require('.././Controllers/Questions.js');
const Responses                       = require('.././Controllers/Responses.js');
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
router.get('/',validators.checkLanguage, auth.isLoggedin, (request,response)=>{

	// render the pages by language specefied
	response.render(`${request.lang.langPages}/`);
	
})


router.get('/login',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Check for error messages if exists
	const { loggedIn, message } = request.query;
	
	if (loggedIn == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/login`,{ errMessage: null });
	}
	else if(loggedIn == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/login`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/login`,{ errMessage: null });
	}
})


router.get('/register',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Check for error messages if exists
	const { registered, message } = request.query;

	if (registered == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/register`,{ errMessage: null });
	}
	else if (registered == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/register`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/register`,{ errMessage: null });
	}
})


router.get('/resetPassword',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Check for error messages if exists
	const { sent, message } = request.query;

	if (sent == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/resetPassword`,{ errMessage: null });
	}
	else if (sent == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/resetPassword`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/resetPassword`,{ errMessage: null });
	}
})


router.get('/emailSent',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Get the email
	const { to } = request.query;
	// Check the provided language
	response.render(`${request.lang.langPages}/emailSent`,{email:to});
})


router.get('/changePassword',validators.checkLanguage, auth.isLoggedin, auth.isTokenValid, (request,response)=>{
	// Check for error messages if exists
	const { changed, message } = request.query;
	// Validation results of isTokenValid
	const { email, token } = request.nextStep;
	
	// Check if errors  happen
	if (changed == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/changePassword`,{ errMessage: null,email:email,token:token });
	}
	else if (changed == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/changePassword`,{ errMessage: message,email:email,token:token });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/changePassword`,{ errMessage: null,email:email,token:token });
	}
	
})


router.get('/dashboard', validators.checkLanguage, auth.isAuthenticated, async(request,response)=>{
	// Get authenticated user
	const user = request.user;

	// Use the appropriate controller
	const surveys = await questionsController.findSurvey( user.id, null );

	// Checking ...
	if (surveys.found){
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/dashboard` , { surveys : surveys.data, user });
	}
	else {
		response.redirect(`/serverError?lang=${request.lang.langShortcut}`)
	}	
})


router.get('/embedded',validators.checkLanguage,(request,response)=>{
	
	// Use the appropriate controller
	// Logic
	// render the pages by language specefied
	response.render(`${request.lang.langPages}/embedded`);

})


router.get('/surveyEditor', validators.checkLanguage, auth.isAuthenticated, async(request,response)=>{
	// Get authenticated user
	const user = request.user;
		
	// Checking ...
	if ( request.query.survey_id == undefined ){
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/surveyEditor`,{survey:null, user});
	}
	else {  
		// Use the appropriate controller
		const survey = await questionsController.findSurvey( user.id, request.query.survey_id );

		// Find responses
		// Proccess responses to get the answers results to display them in chart
		
		if ( !survey.found ) {
			response.redirect(`/notFound?lang=${request.lang.langShortcut}`);
		}
		else {
			// render the pages by language specefied
			response.render(`${request.lang.langPages}/surveyEditor`,{survey:survey.data, user});
		}
	}
})


router.get('/submitResponse', validators.checkLanguage, async(request,response)=>{
	// Survey ID
	const survey_id = request.query.survey_id;

	// Get the survey
	const getSurvey = await questionsController.findSurvey( null, survey_id );

	// Checking ...
	if ( getSurvey.found ){
		// render the pages by language specefied
		response.render(`${request.lang.langPages}/SubmitSurveyResponse`, { survey: getSurvey.data });
	}
	else {
		response.redirect(`/notFound?lang=${request.lang.langShortcut}`);
	}
})


router.get('/thankYou',validators.checkLanguage,(request,response)=>{
	
	// render the pages by language specefied
	response.render(`${request.lang.langPages}/thankYou`);

})


// route    GET
// desc     render error pages if something wrong happened ! ! !
router.get('/serverError',validators.checkLanguage,auth.isAuthenticated,(request,response)=>{
	// Get authenticated user
	const user = request.user;
	// render the pages by language specefied
	response.render(`${request.lang.langPages}/FiveOO`,{user:user});
	
})


router.get('*',validators.checkLanguage,auth.isAuthenticated,(request,response)=>{
	// Get authenticated user
	const user = request.user;

	response.render('pages/forOFor',{user:user});
})






module.exports = router;