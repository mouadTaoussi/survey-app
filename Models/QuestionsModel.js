const mongoose                        = require('mongoose'); 

const Question = new mongoose.Schema({
	// Something goes here ...
	type : String,
	title : String,
	file : {type : String},
	options : mongoose.Schema.Types.Mixed,
	required : Boolean,
	result : [{type:Number,default : []}]
});

const Questions = new mongoose.Schema({
	// Something goes here ...
	user_id : String,
	active : Boolean,
	title : String,
	description : String,
	questions : [Question]
});

module.exports = mongoose.model('questions',Questions);