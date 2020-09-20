const Linkedin                        = require('passport-linkedin-oauth2').Strategy;
const Google                          = require('passport-google-oauth20').Strategy;
const Github                          = require('passport-github').Strategy;
const passport                        = require('passport');
// Users model
const UserModel                       = require('.././Models/UserModel.js');

const authenticationStrategies = {

// Github strategy.
googleStrategy : ()=>{
	passport.use(new Google({
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
			provider : profile.provider
		}
		
		// check user in database
		const UserInDb = await UserModel.findOne({atProviderId : user.atProviderId});

		// user exists
		if (UserInDb) { done(null,user); }
		// user doesn't exits
		else {
			try {
				// Check if email was taken by another user
				///////////////////////////////////////////
				const isEmailExists = await UserModel.find({ email: data.email });

				if ( isEmailExists ) {
					done("Email already exists!");
				}
				else {
					new UserModel(user).save(); done(null,user);	
				}
				
			}
			catch (err){ done(err); }
		}
	}))
},

// Google strategy
githubStrategy : ()=>{
	passport.use(new Github({
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
			provider : profile.provider
		}

		// check user in database
		const UserInDb = await UserModel.findOne({atProviderId : user.atProviderId});

		// user exists
		if (UserInDb) { done(null,user); }
		// user doesn't exits
		else {
			try {
				// Check if email was taken by another user
				///////////////////////////////////////////
				const isEmailExists = await UserModel.find({ email: data.email });

				if ( isEmailExists ) {
					done("Email already exists!");
				}
				else {
					new UserModel(user).save(); done(null,user);	
				}
				
			} catch (err){ done(err); }
		}
	}))
},

// Linkedin strategy
linkedInStrategy : ()=>{
	passport.use(new Linkedin({
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
			provider : profile.provider
		}
		
		// check user in database
		const UserInDb = await UserModel.findOne({atProviderId : user.atProviderId});

		// user exists
		if (UserInDb) { done(null,user); }
		// user doesn't exits
		else {
			try {
				// Check if email was taken by another user
				///////////////////////////////////////////
				const isEmailExists = await UserModel.find({ email: data.email });

				if ( isEmailExists ) {
					done("Email already exists!");
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
		console.log('serializeUser Fired!');
	    done(null, user)
	});
},

deserializeUser : ()=>{
	passport.deserializeUser(function(id, done) {
		console.log('deserializeUser Fired!');
	})
}
}

module.exports = authenticationStrategies;