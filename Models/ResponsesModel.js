const mongoose                        = require('mongoose'); 

const Response = new mongoose.Schema({
	// Something goes here ...
	type : String,
	title : String,
	question_id: String, // TODO added questio_id
	result : mongoose.Schema.Types.Mixed
})

const Responses = new mongoose.Schema({
	// Something goes here ...
	survey_id : String,
	responses : [Response]
})

module.exports = mongoose.model('responses',Responses);