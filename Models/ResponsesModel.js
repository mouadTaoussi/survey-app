const mongoose                        = require('mongoose'); 

const Response = new mongoose.Schema({
	// Something goes here ...
})

const Responses = new mongoose.Schema({
	// Something goes here ...
})

module.exports = mongoose.model('responses',Responses);