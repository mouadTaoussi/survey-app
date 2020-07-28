const mongoose                        = require('mongoose'); 

const Response = new mongoose.Schema({
	// Something goes here ...
	type : String,
	question : String,
	result : mongoose.Schema.Types.Mixed
})

const Responses = new mongoose.Schema({
	// Something goes here ...
	question_id : String,
	response : [Response]
})

module.exports = mongoose.model('responses',Responses);