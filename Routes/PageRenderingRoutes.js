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
router.get('/',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/index')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/index')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/index')
	}
	else {
		res.render('pages/index')
	}
})
router.get('/login',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/Login')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/Login')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/Login')
	}
	else {
		res.render('pages/Login')
	}
})
router.get('/register',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/Register')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/Register')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/Register')
	}
	else {
		res.render('pages/Register')
	}
})
router.get('/resetPassword',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/ResetPassword')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/ResetPassword')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/ResetPassword')
	}
	else {
		res.render('pages/ResetPassword')
	}
})
router.get('/changePassword',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/ChangePassword')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/ChangePassword')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/ChangePassword')
	}
	else {
		res.render('pages/ChangePassword')
	}
})
router.get('/dashboard',(req,res)=>{
	const query = req.query;
	// Use the appropriate controller
	// Logic
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/Dashboard')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/Dashboard')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/Dashboard')
	}
	else {
		res.render('pages/Dashboard')
	}
})
router.get('/embedded',(req,res)=>{
	const query = req.query;
	// Use the appropriate controller
	// Logic
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/EmbeddedPage')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/EmbeddedPage')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/EmbeddedPage')
	}
	else {
		res.render('pages/EmbeddedPage')
	}
})
router.get('/surveyEditor',(req,res)=>{
	const query = req.query;
	// Use the appropriate controller
	// Logic
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/SurveyEditor')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/SurveyEditor')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/SurveyEditor')
	}
	else {
		res.render('pages/SurveyEditor')
	}
})
router.get('/submitResponse',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/SubmitSurveyResponse')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/SubmitSurveyResponse')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/SubmitSurveyResponse')
	}
	else {
		res.render('pages/SubmitSurveyResponse')
	}
})
router.get('/thankYou',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/ThankYouPage')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/ThankYouPage')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/ThankYouPage')
	}
	else {
		res.render('pages/ThankYouPage')
	}
})

// route    GET
// desc     render error pages if something wrong happened ! ! !
router.get('/serverError',(req,res)=>{
	const query = req.query;
	// render the pages by language specefied
	if (query.lang === 'en'){
		res.render('pages/fiveOO')
	}else if (query.lang === 'kr'){
		res.render('koreanPages/fiveOO')
	}
	else if (query.lang === 'cn'){
		res.render('chinesePages/fiveOO')
	}
	else {
		res.render('pages/fiveOO')
	}
})

router.get('*',(req,res)=>{
	res.render('pages/forOFor');
})






module.exports = router;