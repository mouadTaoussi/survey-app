const mongoose                        = require('mongoose'); 

const User = new mongoose.Schema({
	atProviderId : {
		type : String,
		required : false
	},
	name : {
		type : String,
		required : false
	},
	fullName : new mongoose.Schema({
		familyName : {
			type : String,
			required : false
		},
		givenName : {
			type : String,
			required : false
		}
	}),
	username : {
		type : String,
		required : false
	},
	email : {
		type : String,
		required : false
	},
	avatar : {
		type : String,
		required : false
	},
	provider : {
		type : String,
		default : 'local'
	},
	password : {
		type : String,
		required : false // 
	}
})

module.exports = mongoose.model('users',User);