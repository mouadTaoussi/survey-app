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
	res.render('pages/index');
})
router.get('/login',(req,res)=>{
 	res.render('pages/Login');
})
router.get('/register',(req,res)=>{
 	res.render('pages/Register');
})
router.get('/resetPassword',(req,res)=>{
 	res.render('pages/ResetPassword');
})
router.get('/changePassword',(req,res)=>{
 	res.render('pages/ChangePassword');
})
router.get('/dashboard',(req,res)=>{
 	res.render('pages/Dashboard');
})
router.get('/embedded',(req,res)=>{
 	res.render('pages/Embedded');
})
router.get('/surveyEditor',(req,res)=>{
 	res.render('pages/SurveyEditor');
})
router.get('/submitResponse',(req,res)=>{
 	res.render('pages/SubmitSurveyResponse');
})
router.get('/thankYou',(req,res)=>{
 	res.render('pages/ThankYouPage',{message:'Hello World!!!'});
})

// route    GET
// desc     render error pages if something wrong happened ! ! !
router.get('/serverError',(req,res)=>{
 	res.render('pages/fiveOO');
})

router.get('*',(req,res)=>{
	res.render('pages/forOFor');
})






module.exports = router;