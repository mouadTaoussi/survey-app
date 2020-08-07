const nodemailer                      = require('nodemailer');
const bcrypt                          = require('bcrypt');
const uuid                            = require('uuid');
// Users modelresetPasswordToken
const User                            = require('.././Models/UserModel.js');
const ResetPasswordTokenModel         = require('.././Models/ResetPasswordToken.js');

class Authentication {
	async login(email,password){
		if (email == null && password == null) return {
			message : 'Fill all the inputs!',
			loggedIn : false
		}	
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
		if (firstName == null && givenName == null && username == null && email == null && password == null) return {
			message : 'Fill all the inputs!',
			registered : false
		}	
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
	}
	getUser(user_id){

	}
	updateUser(user_id,body){

	}
	async resetPassword(email,lang){
		// return 'we sent something to ur inbox at ' + email + ' !! go check it out ASAP!!!!!';

		// Validate email 
		try {
			const user = await User.findOne({email:email});
			if(user){
				// Generate en id 
				const generatedUD = uuid.v4();
				const token = new ResetPasswordTokenModel({
					user_id: user.id,
					token : generatedUD
				});
				// Save it to database
				await token.save();
				// Create transporter object with credentials
				var transporter = nodemailer.createTransport({
					service :'gmail',
					auth: {
						user: process.env.EMAIL_ADDRESSE,
						pass: process.env.EMAIL_PASSWORD
					}
				});
				// Check the language the user set in the app to send the email appropriated to his language
				let mailTemplate;
				
				if (lang === 'en'){
					mailTemplate = `
					<!DOCTYPE html><!-- English template -->
					<html>
					<head>
						<title>Email template</title>
					</head>
					<body style='background-color: rgba(0,0,0,.1);padding:20px;' >
						<center></center>
						<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">Hello World<br>
						<a href='~'>
							<button style="border: 0;padding: 5px 30px 5px 30px;margin:20px 00px 0px 0px;font-family: 'Cabin', sans-serif;background-color: #1554a7;color: white;">Change Password</button>
						</a>
						</div>
						
						<center>
							<ul style="list-style: none;margin: 10px 10px 10px 10px;" class="footer-list local-mt-4">
								<li style='display: inline;padding:8px;' class='footer-list-item'>Terms of service</li>
								<li style='display: inline;padding:8px;' class='footer-list-item'>Privacy & policy</li>
								<li style='display: inline;padding:8px;' class='footer-list-item'>How it works?</li>
							</ul>
						</center>
					</body>
					</html>
					`
				}
				else if (lang = 'kr'){
					mailTemplate = `
					<!DOCTYPE html> <!-- Korean template -->
					<html>
					<head>
						<title>Email template</title>
					</head>
					<body style='background-color: rgba(0,0,0,.1);padding:20px;' >
						<center></center>
						<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">Hello World<br>
						<a href='~'>
							<button style="border: 0;padding: 5px 30px 5px 30px;margin:20px 00px 0px 0px;font-family: 'Cabin', sans-serif;background-color: #1554a7;color: white;">비밀번호 변경</button>
						</a>
						</div>
						
						<center>
							<ul style="list-style: none;margin: 10px 10px 10px 10px;" class="footer-list local-mt-4">
								<li style='display: inline;padding:8px;' class='footer-list-item'>서비스 약관</li>
								<li style='display: inline;padding:8px;' class='footer-list-item'>개인 정보 정책</li>
								<li style='display: inline;padding:8px;' class='footer-list-item'>어떻게 작동합니까?</li>
							</ul>
						</center>
					</body>
					</html>
					`
				}
				else {
					mailTemplate = `
					<!DOCTYPE html> <!-- Chinese template -->
					<html>
					<head>
						<title>Email template</title>
					</head>
					<body style='background-color: rgba(0,0,0,.1);padding:20px;' >
						<center></center>
						<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">Hello World<br>
						<a href='~'>
							<button style="border: 0;padding: 5px 30px 5px 30px;margin:20px 00px 0px 0px;font-family: 'Cabin', sans-serif;background-color: #1554a7;color: white;">更改密码</button>
						</a>
						</div>
						
						<center>
							<ul style="list-style: none;margin: 10px 10px 10px 10px;" class="footer-list local-mt-4">
								<li style='display: inline;padding:8px;' class='footer-list-item'>服务条款</li>
								<li style='display: inline;padding:8px;' class='footer-list-item'>隐私政策</li>
								<li style='display: inline;padding:8px;' class='footer-list-item'>这个怎么运作？</li>
							</ul>
						</center>
					</body>
					</html>
					`
				}
				// Create email options
				var mailOptions = {
				    from: '"SurveyApp Team" <mouadtaoussi0@gmail.com>',
				    to: email,
				    subject: 'Reset password request',
				    text: 'Hey there, it’s your link to change your password below ;) ', 
				    html: mailTemplate
				};
				// send it!
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						return {
							message : "Something went wrong!",
							sent : false
						}
					} else {
						return {
							message: "Email Sent To " + email,
							sent: true,
						};	
					}
				});
			}
			else {
				return {
					message : "No user with that email!",
					sent : false
				}
			}
		}
		catch{
			return {
				message : "Something went wrong!",
				sent : false
			}
		}
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



