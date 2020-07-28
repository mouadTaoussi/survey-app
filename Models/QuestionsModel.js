const mongoose                        = require('mongoose'); 

const Question = new mongoose.Schema({
	// Something goes here ...
	type : String,
	title : String,
	files : [{type : String}],
	options : mongoose.Schema.Types.Mixed,
	required : Boolean
});

const Questions = new mongoose.Schema({
	// Something goes here ...
	user_id : String,
	active : Boolean,
	title : String,
	description : String,
	question : [Question]
});

module.exports = mongoose.model('questions',Questions);