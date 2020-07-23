const mongoose                        = require('mongoose'); 

const Question = new mongoose.Schema({
	// Something goes here ...
})

const Questions = new mongoose.Schema({
	// Something goes here ...
})

module.exports = mongoose.model('questions',Questions);

