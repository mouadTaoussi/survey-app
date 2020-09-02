const Response                             = require('.././Models/ResponsesModel.js');

class Responses {
	async submitResponses(responses){
		try {
			const saving = await Response(responses).save();
			
			return {
				saved : true,
				message : 'Your responses has been saved!!!'
			}
		}
		catch(err){
			return {
				saved : false,
				message : "Something went wrong! Try again."
			}
		}
	}
	async findResponses(survey_id){
		try {

			const responses = await Response.find({survey_id:survey_id});
			
			return {
				found : true,
				data : responses
			}
		}
		catch(err){
			return {
				found : false,
				message : "Something went wrong! Try again."
			}
		}
	}
}

module.exports = Responses;
// tye