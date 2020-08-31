const mongoose                        = require('mongoose'); 

const Response = new mongoose.Schema({
	// Something goes here ...
	type : String,
	title : String,
	result : mongoose.Schema.Types.Mixed
})

const Responses = new mongoose.Schema({
	// Something goes here ...
	survey_id : String,
	responses : [Response]
})

module.exports = mongoose.model('responses',Responses);