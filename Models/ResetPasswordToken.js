const mongoose                        = require('mongoose'); 

const resetPasswordToken = new mongoose.Schema({
	// Something goes here ...
	user_id: {
		type : String,
		required : true
	},
	token : {
		type : String,
		required : true
	},
	expires_in : {
		type : String,
		required : true,
		default : 20
	}
})

module.exports = mongoose.model('resetPasswordTokens',resetPasswordToken);

