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
	
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/login`);
	
})
router.get('/register',validators.checkLanguage,(req,res)=>{
	
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/register`);

})
router.get('/resetPassword',validators.checkLanguage,(req,res)=>{
	
	// render the pages by language specefied
	res.render(`${req.lang.langPages}/resetPassword`);
	
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