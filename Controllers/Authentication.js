const nodemailer                      = require('nodemailer');
const bcrypt                          = require('bcrypt');
const uuid                            = require('uuid');
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
	async getUser(user_id){
		try {
			const user = await User.findById(user_id);
			if (!user) return {
				found : false,
				message : 'User not found!'
			}
			return {
				found : true,
				user : user
			}
		}
		catch(err){
			return {
				found : false,
				message : 'Something went wrong!'
			}
		}
	}
	async updateUser(user_id,bodyData){
		try {
			// Check if email was taken by another user
			///////////////////////////////////////////
			const isEmailExists = await User.findOne({ email: bodyData.email });

			if (isEmailExists._id !== user_id) {
				return {
					saved : false,
					message : 'Email already exists!',
				}
			}
		
			// Update or save changes
			const saving = await User.findByIdAndUpdate(user_id,bodyData);

			// Update the full name credentials
			const user   = await User.findById(user_id);

			user.fullName.familyName = bodyData.firstName;
			user.fullName.givenName = bodyData.givenName;

			// Save the full name credentials
			await user.save();

			// return
			return {
				saved : true,
				message : 'Saved your changes!',
				
			}
		}
		catch (err){
			return {
				saved : false,
				message : "Something went wrong!"
			}
		}
		
	}
	async resetPassword(email,lang){
		// return 'we sent something to ur inbox at ' + email + ' !! go check it out ASAP!!!!!';

		// Validate email 
		try {
			const user = await User.findOne({email:email});

			// if true then redirect him to login page !!!
			if(user){
				// Check if the user has logged in from Oauth20
				if (user.provider !== 'local') return {
					sent : false,
					message : 'you cannot change the password because you have logged in via a service like google'
				}
				// Check if the user already requested to change thier password ! ! !
				const isAlreadyRequestedAToken = await ResetPasswordTokenModel.findOne({user_id: user.id});
				if (isAlreadyRequestedAToken) return {
					sent : false,
					message : "We've already sent an link to your inbox to change your password"
				}
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
					auth: { user: process.env.EMAIL_ADDRESSE, pass: process.env.EMAIL_PASSWORD }
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
				<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">
				<h1>Hello ${user.name}</h1>
				<h5>Please click on the button below for get redirected to the page where you can change the password from it!</h5>
				<i>NB: your request will be expired after 20 minutes from now</i>
				<p><strong>Thank you!</strong></p>
				<a href='${process.env.HOST_NAME}/changePassword?lang=${lang}&token=${generatedUD}&email=${email}'>
					<button style="border: 0;padding: 5px 30px 5px 30px;margin:20px 00px 0px 0px;font-family: 'Cabin', sans-serif;background-color: #1554a7;color: white;">Change Password</button>
				</a>
				<p>${process.env.HOST_NAME}/changePassword?lang=${lang}&token=${generatedUD}&email=${email}</p>
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
				else if (lang === 'kr'){
				mailTemplate = `
				<!DOCTYPE html> <!-- Korean template -->
				<html>
				<head>
					<title>Email template</title>
				</head>
				<body style='background-color: rgba(0,0,0,.1);padding:20px;' >
				<center></center>
				<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">
				<h1>안녕 ${user.name}</h1>
				<h5>비밀번호를 변경할 수있는 페이지로 이동하려면 아래 버튼을 클릭하십시오!</h5>
				<i>주의 : 귀하의 요청은 지금부터 20 분 후에 만료됩니다.</i>
				<p><strong>감사합니다!</strong></p>
				<a href='${process.env.HOST_NAME}/changePassword?lang=${lang}&token=${generatedUD}&email=${email}'>
					<button style="border: 0;padding: 5px 30px 5px 30px;margin:20px 00px 0px 0px;font-family: 'Cabin', sans-serif;background-color: #1554a7;color: white;">비밀번호 변경</button>
				</a>
				<p>${process.env.HOST_NAME}/changePassword?lang=${lang}&token=${generatedUD}&email=${email}</p>
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
				else if (lang === 'cn'){
				mailTemplate = `
				<!DOCTYPE html> <!-- Chinese template -->
				<html>
				<head>
					<title>Email template</title>
				</head>
				<body style='background-color: rgba(0,0,0,.1);padding:20px;' >
				<center></center>
				<div style="width: 70%;margin: 20px auto;background: white;height: auto;color: rgba(0,0,0,.89);padding:20px;">
				<h1>你好 ${user.name}</h1>
				<h5>请单击下面的按钮以重定向到页面，您可以在其中更改密码！</h5>
				<i>注意：您的要求将在20分钟后过期</i>
				<p><strong>谢谢!</strong></p>
				<a href='${process.env.HOST_NAME}/changePassword?lang=${lang}&token=${generatedUD}&email=${email}'>
					<button style="border: 0;padding: 5px 30px 5px 30px;margin:20px 00px 0px 0px;font-family: 'Cabin', sans-serif;background-color: #1554a7;color: white;">更改密码</button>
				</a>
				<p>${process.env.HOST_NAME}/changePassword?lang=${lang}&token=${generatedUD}&email=${email}</p>
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
				// send it!
				transporter.sendMail({
					from: '"SurveyApp Team" <mouadtaoussi0@gmail.com>',
				    to: email,
				    subject: 'Reset password request',
				    text: 'Hey there, it’s your link to change your password below ;) ', 
				    html: mailTemplate
				});
			}
			else {
				return { message : "No user with that email!", sent : false }
			}
		}
		catch (err){
			return { message : "Something went wrong!", sent : false }
		}
		return { message : "Email was sent!", sent : true }
	}
	async changePassword(email,token,new_password,password2){

		// Compare passwords
		if (new_password !== password2) return {
			changed : false,
			message : 'Confirm your password!'
		}

		// Hash the new password
		const salt = await bcrypt.genSalt(10);
		const hashed_new_password = await bcrypt.hash(new_password,salt);

		// Changing password proccess and destroy token
		try {
			const user = await User.findOne({email:email});
			// Check if user log in via  an Oauth service
			if (user.provider !== 'local') return {
			  	changed : false,
				message : 'you cannot change the password because you have logged in via a service like google'
			}
			// Change password
			user.password = hashed_new_password;
			await user.save();
			// Destroy the current token
			const currentToken = await ResetPasswordTokenModel.findOne({token:token});
			currentToken.remove();
			return {
				changed : true,
				message : 'Password changed successfully!',
				user : user
			}
		}
		catch(err){
			return {
				changed : false,
				message : 'Something went wrong!!'
			}
		}
	}
	async trackResetPasswordTokens(){
		try {
			// Get all tokens
			const tokens = await ResetPasswordTokenModel.find();
			// Ileterate over them to check the time rest for decide wheater reduce it or drop!!!
			for (var i = 0; i < tokens.length; i++) {

				// Get the id of the token provided by mongoose ! sorry if i mixed the identifiers that made you confused XD !!!
				const token_id = tokens[i].id;

				// Checking ...
				if ( tokens[i].expires_in !== 0 ){

					// Decrease the minutes to reach to zero and drop the token below
					tokens[i].expires_in = tokens[i].expires_in-1;

					// Update
					await tokens[i].save();
				}
				else if( tokens[i].expires_in === 0 ) {
					// Drop that token form the database
					await tokens[i].remove();
				}
			}
		}
		catch (err){
			console.log('[ERROR]: Something went wrong in Controllers/Authentication.js:302:17');
		}
	}
}

// Run track reset password tokens process every minute ! ! !
const authentication = new Authentication();
setInterval(authentication.trackResetPasswordTokens,60000);

module.exports = Authentication;



