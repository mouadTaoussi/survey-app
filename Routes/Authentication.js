const express                         = require('express');
const passport                        = require('passport');
/////////////////////////////////////// GRAB THE APPROPRIATE CONTROLLER CLASS
const Authentication                  = require('.././Controllers/Authentication.js');
/////////////////////////////////////// GRAB THE APPROPRIATE MIDDLEWARE
const auth                            = require('.././Middlewares/Authentication.js');

// Init appropriate controller
const authController = new Authentication();

// Init router
const router = express.Router();

// Oauth routes to get user logged in!
router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/github',passport.authenticate('github',{scope:['profile','email']}));
router.get('/linkedin',passport.authenticate('linkedin'));

// Callbacks or Oauth services to get user redirected to!
router.get('/google/callback',passport.authenticate('google',{failureRedirect : '/',successRedirect : '/'}));
router.get('/github/callback',passport.authenticate('github',{failureRedirect : '/',successRedirect : '/'}));
router.get('/linkedin/callback',passport.authenticate('linkedin',{failureRedirect : '/',successRedirect : '/'}));

// Local Authentication Strategy
router.get('/login',(req,res)=>{
	res.json(authController.login());
});
router.get('/register',(req,res)=>{
	res.json(authController.register());
})
router.get('/resetPassword',(req,res)=>{
	res.json(authController.resetPassword('muoadtaoussi0@mail.com'));
})
router.get('/changePassword',(req,res)=>{
	res.json(authController.changePassword('544444444','helloworld'));
})
router.get('/logout',(req,res)=>{
	req.session.destroy(function(err) {
		// cannot access session here
		res.redirect('/');
	})
})

module.exports = router;