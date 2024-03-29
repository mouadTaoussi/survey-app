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
	response.render(`${request.lang.views_lang}/index`);
	
})

router.get('/privacyPolicy',validators.checkLanguage,(request,response)=>{
	
	// render the pages by language specefied
	response.render(`${request.lang.views_lang}/PrivacyAndPolicy`);

})

router.get('/docs',validators.checkLanguage,(request,response)=>{
	
	// render the pages by language specefied
	response.render(`${request.lang.views_lang}/Documentation`);

})

router.get('/login',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Check for error messages if exists
	const { loggedIn, message } = request.query;
	
	if (loggedIn == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/Login`,{ errMessage: null });
	}
	else if(loggedIn == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/Login`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/Login`,{ errMessage: null });
	}
})


router.get('/register',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Check for error messages if exists
	const { registered, message } = request.query;

	if (registered == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/Register`,{ errMessage: null });
	}
	else if (registered == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/Register`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/Register`,{ errMessage: null });
	}
})


router.get('/resetPassword',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Check for error messages if exists
	const { sent, message } = request.query;

	if (sent == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/ResetPassword`,{ errMessage: null });
	}
	else if (sent == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/ResetPassword`,{ errMessage: message });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/ResetPassword`,{ errMessage: null });
	}
})


router.get('/emailSent',validators.checkLanguage,auth.isLoggedin,(request,response)=>{
	// Get the email
	const { to } = request.query;
	// Check the provided language
	response.render(`${request.lang.views_lang}/EmailSent`,{email:to});
})


router.get('/changePassword',validators.checkLanguage, auth.isLoggedin, auth.isTokenValid, (request,response)=>{
	// Check for error messages if exists
	const { changed, message } = request.query;
	// Validation results of isTokenValid
	const { email, token } = request.nextStep;
	
	// Check if errors  happen
	if (changed == undefined) {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/ChangePassword`,{ errMessage: null,email:email,token:token });
	}
	else if (changed == 'false'){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/ChangePassword`,{ errMessage: message,email:email,token:token });
	}
	else {
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/ChangePassword`,{ errMessage: null,email:email,token:token });
	}
	
})


router.get('/dashboard', validators.checkLanguage, auth.isAuthenticated, auth.isCompletedCredentiels, async(request,response)=>{
	// Get authenticated user
	const user = request.user;
	
	// Use the appropriate controller
	const surveys = await questionsController.findSurvey( user.id, null );
	// Checking ...
	if (surveys.found){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/Dashboard` , { surveys: surveys.data, user: user, infos: request.info });
	}
	else {
		response.redirect(`/serverError?lang=${request.lang.langShortcut}`)
	}	
})


router.get('/embedded',validators.checkLanguage,async(request,response)=>{
	// Survey ID
	const survey_id = request.query.survey_id;

	// Get the survey
	const getSurvey = await questionsController.findSurvey( null, survey_id );

	// Checking ...
	if ( getSurvey.found ){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/EmbeddedPage`, { survey: getSurvey.data });
	}
	else {
		response.redirect(`/notFound?lang=${request.lang.langShortcut}`);
	}
	
})


router.get('/surveyEditor', validators.checkLanguage, auth.isAuthenticated, async(request,response)=>{
	// Get authenticated user
	const user = request.user;
		
	// Checking ...
	if ( request.query.survey_id == undefined || request.query.survey_id == "" ){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/SurveyEditor`,{survey:null, user});
	}
	else {  
		
		// Use the appropriate controller
		// Note: /findSurvey/ finds the survey that the user owens so no need to attach <isOwenedTheSurvey_App> middleware
		const survey = await questionsController.findSurvey( user.id, request.query.survey_id );

		if ( !survey.found ) {
			response.redirect(`/notFound?lang=${request.lang.langShortcut}`);
		}
		else {
			// render the pages by language specefied
			response.render(`${request.lang.views_lang}/SurveyEditor`,{survey:survey.data, user});
		}
	}
})

router.get('/results', validators.checkLanguage, auth.isAuthenticated, auth.isOwenedTheSurvey_App, async(request,response)=>{
	// render the pages 
	response.render(`${request.lang.views_lang}/ResultsFullScreen`);
})

router.get('/submitResponse', validators.checkLanguage, async(request,response)=>{
	// Survey ID
	const survey_id = request.query.survey_id;

	// Get the survey
	const getSurvey = await questionsController.findSurvey( null, survey_id );

	// Checking ...
	if ( getSurvey.found ){
		// render the pages by language specefied
		response.render(`${request.lang.views_lang}/SubmitSurveyResponse`, { survey: getSurvey.data });
	}
	else {
		response.redirect(`/notFound?lang=${request.lang.langShortcut}`);
	}
})


router.get('/thankYou',validators.checkLanguage,(request,response)=>{
	
	// render the pages by language specefied
	response.render(`${request.lang.views_lang}/ThankYou`);

})


// route    GET
// desc     render error pages if something wrong happened ! ! !
router.get('/serverError',validators.checkLanguage,auth.isAuthenticated,(request,response)=>{
	// Get authenticated user
	const user = request.user;
	// render the pages by language specefied
	response.render(`${request.lang.views_lang}/FiveOO`,{user:user});
	
})


router.get('*',validators.checkLanguage,auth.isAuthenticated,(request,response)=>{
	// Get authenticated user
	const user = request.user;
	// render the pages by language specefied// render the pages by language specefied
	response.render(`${request.lang.views_lang}/forOFor`,{user:user});
})






module.exports = router;