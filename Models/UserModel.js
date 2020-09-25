const mongoose                        = require('mongoose'); 
const uuid_apikey                     = require('uuid-apikey');

const User = new mongoose.Schema({
	atProviderId : {
		type : String,
		required : false,
		default : null
	},
	name : {
		type : String,
		required : false,
	},
	fullName : new mongoose.Schema({
		familyName : {
			type : String,
			required : false,
			default : null
		},
		givenName : {
			type : String,
			required : false,
			default : null
		}
	}),
	username : {
		type : String,
		required : false,
		default : null
	},
	email : {
		type : String,
		required : false,
		default : null
	},
	avatar : {
		type : String,
		required : false,
		default : null
	},
	provider : {
		type : String,
		default : 'local'
	},
	password : {
		type : String,
		required : false // 
	},
	apiKey : {
		type : String,
		required : true,
	}
})



module.exports = mongoose.model('users',User);