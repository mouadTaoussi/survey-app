// Users model
const Question                             = require('.././Models/QuestionsModel.js');

class Questions {
	addSurvey(questions){

	}
	findSurvey(options){
		const user_id = options.user_id || null;
		const survey_id = options.survey_id || null;
	}
	updateSurvey(questions_id,questions){

	}
	deleteSurvey(questions_id){

	}
	processSurveyResponses(questions,responses){
		// const questions.options = responses.responses[0].options;

	}
	validateSurvey(){

	}
}


module.exports = Questions;