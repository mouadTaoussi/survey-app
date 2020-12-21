const LinkedinOauthStrategy           = require('passport-linkedin-oauth2').Strategy;
const GoogleOauthStrategy             = require('passport-google-oauth20').Strategy;
const GithubOauthStrategy             = require('passport-github').Strategy;
const passport                        = require('passport');
const uuid_apikey                     = require('uuid-apikey');
// Users model
const UserModel                       = require('.././Models/UserModel.js');

const authenticationStrategies = {

// Github strategy.
googleStrategy : function (){
	passport.use(new GoogleOauthStrategy({
		clientID: process.env.GOOGLE_ID,
		clientSecret: process.env.GOOGLE_SECRET,
		callbackURL: "/auth/google/callback"
	},
	async (accessToken,refreshToken,profile,done)=>{
		// initialize user
		const user = {
			atProviderId : profile.id,
			name : profile.displayName,
			fullName : {
				familyName : profile.name.familyName,
				givenName : profile.name.givenName
			},
			email : profile.emails[0].value,
			avatar : profile.photos[0].value,
			provider : profile.provider,
		}

		// check user in database
		const UserInDb = await UserModel.findOne({ atProviderId : user.atProviderId });
		
		// user exists
		if (UserInDb) { done(null,user); }
		// user doesn't exits
		else {
			try {
				// Check if email was taken by another user
				///////////////////////////////////////////
				const isEmailExists = await UserModel.findOne({ email: user.email });

				if ( isEmailExists ) {

					// We gonna save the user without email and let hima put an email in future
					user.email = null;

					// Set an API KEY
					apiKey = uuid_apikey.create({ noDashes:true }).apiKey;

					// Save user
					new UserModel(user).save(); done(null,user);	
					console.log('From passwort')
					console.log(user)
				}
				else {
					new UserModel(user).save(); done(null,user);
					console.log('From passwort')
					console.log(user)
				}
				
			}
			catch (err){ done(err); console.log("From Passwort");console.log(err) }
		}
	}))
},

// Google strategy
githubStrategy : function (){
	passport.use(new GithubOauthStrategy({
		clientID: process.env.GITHUB_ID,
		clientSecret: process.env.GITHUB_SECRET,
		callbackURL: "/auth/github/callback"
	},
	async (accessToken,refreshToken,profile,done)=>{

		// initialize user
		const user = {
			atProviderId : profile.id,
			name : profile.displayName,
			fullName : {
				familyName : profile.displayName.split(' ')[1] || null,
				givenName : profile.displayName.split(' ')[0] || null
			},
			userName : profile.username,
			email : profile.email,
			avatar : profile.photos[0].value,
			provider : profile.provider,
			
		}

		// check user in database
		const UserInDb = await UserModel.findOne({ atProviderId : user.atProviderId });

		// user exists
		if (UserInDb) { done(null,user); }
		// user doesn't exits
		else {
			try {

				// Check if email was taken by another user
				///////////////////////////////////////////
				const isEmailExists = await UserModel.findOne({ email: user.email });

				if ( isEmailExists ) {

					// We gonna save the user without email and let hima put an email in future
					user.email = null;

					// Set an API KEY
					apiKey = uuid_apikey.create({ noDashes:true }).apiKey;

					// Save user
					new UserModel(user).save(); done(null,user);
				}
				else {
					new UserModel(user).save(); done(null,user);		
				}
				
			} catch (err){ done(err); }
		}
	}))
},

// Linkedin strategy
linkedInStrategy : function(){
	passport.use(new LinkedinOauthStrategy({
		clientID: process.env.LINKEDIN_ID,
		clientSecret: process.env.LINKEDIN_SECRET,
		scope: ['r_emailaddress', 'r_liteprofile'],
		callbackURL: "/auth/linkedin/callback"

	},
	async (accessToken,refreshToken,profile,done)=>{
		// initialize user
		const user = {
			atProviderId : profile.id,
			name : profile.displayName,
			fullName : {
				familyName : profile.name.familyName,
				givenName : profile.name.givenName
			},
			email : profile.emails[0].value,
			avatar : profile.photos[0].value,
			provider : profile.provider,
			
		}
		
		// check user in database
		const UserInDb = await UserModel.findOne({ atProviderId : user.atProviderId });

		// user exists
		if (UserInDb) { done(null,user); }
		// user doesn't exits
		else {
			try {
				// Check if email was taken by another user
				///////////////////////////////////////////
				const isEmailExists = await UserModel.findOne({ email: user.email });

				if ( isEmailExists ) {

					// We gonna save the user without email and let him put an email in future
					user.email = null;

					// Set an API KEY
					apiKey = uuid_apikey.create({ noDashes:true }).apiKey;
					
					// Save user
					new UserModel(user).save(); done(null,user);	
				}
				else {
					new UserModel(user).save(); done(null,user);	
				}
				
			} catch (err){ done(err); }
		}
	}))
},

serializeUser : ()=>{
	passport.serializeUser((user, done) => {
		// console.log('serializeUser Fired!');
	    done(null, user)
	});
},

deserializeUser : ()=>{
	passport.deserializeUser(function(id, done) {
		console.log('deserializeUser Fired!');
	})
},

}

module.exports = authenticationStrategies;