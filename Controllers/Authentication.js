const nodemailer                      = require('nodemailer');
const firebase                        = require('firebase-admin');
// Users modelresetPasswordToken
const User                            = require('.././Models/UserModel.js');
const ResetPasswordTokenModel         = require('.././Models/ResetPasswordToken.js');

class Authentication {
	login(email = null, name = null, password){
		return 'Logged in as a hangfire';
	}
	register(name,email,username,avatar,password,conf_password){
		return 'Registered'
	}
	getUser(user_id){

	}
	updateUser(user_id,body){

	}
	resetPassword(email){
		return 'we sent something to ur inbox at ' + email + ' !! go check it out ASAP!!!!!';
	}
	changePassword(token,new_password){
		return 'Password changed brah!!!!!';
	}
	isAuthenticated(req,res,next){

	}
	isLoggedIn(req,res,next){

	}
	isProvidedAllCredentials(req,res,next){

	}
	trackResetPasswordTokens(){
		console.log('[INFO]: Hello World');
	}
}

// Start track reset password tokens
// const authentication = new Authentication();
// setInterval(authentication.trackResetPasswordTokens,60000);


module.exports = Authentication;