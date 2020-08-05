const nodemailer                      = require('nodemailer');
const bcrypt                          = require('bcrypt');
// Users modelresetPasswordToken
const User                            = require('.././Models/UserModel.js');
const ResetPasswordTokenModel         = require('.././Models/ResetPasswordToken.js');

class Authentication {
	async login(email,password){	
		const user = await User.findOne({email : email});
		// Validate Credentials
		if (!user) return {
			message : 'Email or password is not correct!',
			loggedIn : false
		};
		if (!user.password) return {
			message : 'You should login with your google or github or linkedin accounts!',
			loggedIn : false
		};
		// Load hash from your password DB.
		const matched = await bcrypt.compare(password, user.password);
	    if (matched){
	    	return {
				message : 'LoggedIn',
				loggedIn : true,
				user : user
			}	
	    }
	    else {
	    	return {
				message : 'Email or password is not correct!',
				loggedIn : false
			}	
	    }	
	}
	async register(firstName,givenName,username,email,password,password2){
		// Validate email && password
		const user_email = await User.findOne({email : email});
		if (user_email != null) return {
			registered : false,
			message : "Try to use other Email!"
		}
		if (password != password2) return {
			registered : false,
			message : "Confirm your password!"
		}
		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashed_password = await bcrypt.hash(password,salt);
		// Create new user
		const user = {
			name : firstName + ' ' + givenName,
			fullName : {
				familyName : firstName,
				givenName : givenName
			},
			username : username,
			email : email,
			password : hashed_password
		};
		const new_user = new User(user);
		try {
			// Save user to the database
			const saving = await new_user.save();
			return {
				registered : true,
				message : 'User registered!!!',
				user : saving
			}
		}
		catch (err){
			return {
				registered : false,
				message : 'Something went wrong'
			}
		}
		// User.findByIdAndUpdate(user.id,{password : hash});
		// console.log('done!')

		// bcrypt.genSalt(10, function(err, salt) {
		//     bcrypt.hash('helloworld', salt, async function(err, hash) {
		//         // Store hash in your password DB.
		//         console.log(hash)
		//         const matched = await bcrypt.compare('helloworld', hash);
		//         console.log(matched)

		//     });
		// });
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
	trackResetPasswordTokens(){
		console.log('[INFO]: Hello World');
	}
}

// Start track reset password tokens
// const authentication = new Authentication();
// setInterval(authentication.trackResetPasswordTokens,60000);


module.exports = Authentication;



