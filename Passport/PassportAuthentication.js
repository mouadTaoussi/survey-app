const Linkedin                        = require('passport-linkedin-oauth2').Strategy;
const Google                          = require('passport-google-oauth20').Strategy;
const Github                          = require('passport-github').Strategy;
const passport                        = require('passport');
// Users model
const User                            = require('.././Models/UserModel.js');

module.exports = {

	// Github strategy
	googleStrategy : ()=>{
		passport.use(new Google({
			clientID: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: "/auth/google/callback"
		},
		(accessToken,refreshToken,profile,done)=>{
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
			const UserInDb = User.findOne({atProviderId : user.atProviderId})
			.then((data)=>{
				// user exists
				if (data) {done(null,user)}
				// user doesn't exits
				else {
					try {
						new User(user).save();
						done(null,user);
					}
					catch (err){
						done(err);
					}
				}
				
			})
			.catch((err)=>{
				done(err);
			});
		}))
	},

	// Google strategy
	githubStrategy : ()=>{
		passport.use(new Github({
			clientID: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackURL: "/auth/github/callback"
		},
		(accessToken,refreshToken,profile,done)=>{
			// initialize user
			const user = {
				atProviderId : profile.id,
				name : profile.displayName,
				userName : profile.username,
				email : profile.email,
				avatar : profile.photos[0].value,
				provider : profile.provider
			}
			// check user in database
			const UserInDb = User.findOne({atProviderId : user.atProviderId})
			.then((data)=>{
				// user exists
				if (data) {done(null,user)}
				// user doesn't exits
				else {
					try {
						new User(user).save();
						done(null,user);
					}
					catch (err){
						done(err);
					}
				}
				
			})
			.catch((err)=>{
				done(err);
			});
			
		}))
	},

	// Linkedin strategy
	linkedInStrategy : ()=>{
		passport.use(new Linkedin({
			clientID: process.env.LINKEDIN_ID,
			clientSecret: process.env.LINKEDIN_SECRET,
			scope: ['r_emailaddress', 'r_basicprofile'],
			callbackURL: "/auth/linkedin/callback"

		},
		(accessToken,refreshToken,profile,done)=>{
			console.log(profile);
			done(null,user);
		}))
	},

	serializeUser : ()=>{
		passport.serializeUser((user, done) => {
			console.log('serializeUser Fired!');
		    done(null, user)
		});
	},

	// deserializeUser : ()=>{
	// 	passport.deserializeUser(function(id, done) {
			// console.log('deserializeUser Fired!');
		  // User.findById(id, function(err, user) {
		  //   done(err, user);
		  // });
	// }
}


// module.exports = function(){
// 	passport.use(new Google({
// 		clientID: process.env.GOOGLE_ID,
// 		clientSecret: process.env.GOOGLE_SECRET,
// 		callbackURL: "/auth/google/callback"
// 	},
// 	(accessToken,refreshToken,profile,done)=>{
// 		const user = {
// 			id : profile.id,
// 			name : profile.displayName,
// 			fullName : {
// 				familyName : profile.name.familyName,
// 				givenName : profile.name.givenName
// 			},
// 			email : profile.emails[0].value,
// 			avatar : profile.photos[0].value,
// 			provider : profile.provider
// 		}
// 		console.log(user);
// 		done(null,user);
// 	}))
// 	passport.use(new Github({
// 		clientID: process.env.GITHUB_ID,
// 		clientSecret: process.env.GITHUB_SECRET,
// 		callbackURL: "/auth/github/callback"
// 	},
// 	(accessToken,refreshToken,profile,done)=>{
// 		console.log(profile);
// 		done(null,profile);
// 	}))
// 	passport.use(new Linkedin({
// 		consumerKey: process.env.LINKEDIN_ID,
// 		consumerSecret: process.env.LINKEDIN_SECRET,
// 		callbackURL: "/auth/linkedin/callback"

// 	},
// 	(accessToken,refreshToken,profile,done)=>{
// 		console.log(profile);
// 		done(null,user);
// 	}))
// 	passport.serializeUser((user, done) => {
// 		console.log('serializeUser Fired!');
// 	    done(null, user.id)
// 	});
// 	// passport.deserializeUser(function(id, done) {
// 		// console.log('deserializeUser Fired!');
// 	  // User.findById(id, function(err, user) {
// 	  //   done(err, user);
// 	  // });
// // }
// }