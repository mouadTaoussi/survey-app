const mongoose                        = require('mongoose'); 


const Question = new mongoose.Schema({
	// Something goes here ...
	// We user custom id for preventing mongodb update it when the userupdates the survey ! ! !
	_id : {
		type : String, required: true,
	},
	type : String,
	title : String,
	file : {type : String},
	options : [mongoose.Schema.Types.Mixed],
	required : Boolean,
	result : [mongoose.Schema.Types.Mixed]
},{ _id: false });

const Questions = new mongoose.Schema({
	// Something goes here ...
	user_id : String,
	active : Boolean,
	title : String,
	description : String,
	questions : [Question]
});

module.exports = mongoose.model('questions',Questions);

// "1bd2930a-97d7-4cc5-a0bf-f8567e2a61f3"
// "1bd2930a-97d7-4cc5-a0bf-f8567e2a61f3"


