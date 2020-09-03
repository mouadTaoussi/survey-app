const Question                             = require('.././Models/QuestionsModel.js');

class Questions {
	async addSurvey(questions){
		try {
			const saving = await Question(questions).save();

			return {
				saved : true, message : 'Saved your work!', survey_id : saving.id
			}
		}catch(err){
			return {
				saved : false, message : 'Something went wrong! Try again.'
			}
		}
	}
	async findSurvey(user_id,survey_id){

		try {
			// To get list of user surveys
			if ( user_id !== null && survey_id === null ){
				
				const surveys = await Question.find({ user_id: user_id });
				
				return {
					found : true, data : surveys
				}
			}
			// To get the survey for edit 
			else if ( user_id !== null && survey_id !== null ) {

				const survey = await Question.findOne({ _id: survey_id, user_id: user_id });

				if ( survey !== null ) {
					return { found : true, data : survey }	
				}
				else {
					return { found : false, data : null }
				}
			}
			// To get a survey by its id 
			else if ( user_id == null && survey_id !== null ){
				
				const survey = await Question.findOne({ _id: survey_id });

				if ( survey !== null ) {
					return { found : true, data : survey }	
				}
				else {
					return { found : false, data : null }
				}
			}
			else {
				return {
					found : false
				}
			}
		}
		catch (err){
			return {
				found : false, message : "Something went wrong!"
			}
		}

	}
	async updateSurvey(questions_id,questions){

		try {
			// Update or save changes
			const saving = await Question.findByIdAndUpdate(questions_id,questions);
			
			// return
			return {
				saved : true, message : 'Saved your work!', survey_id : questions_id
			}
		}
		catch (err){
			// return
			return {
				saved : false, message : 'Something went wrong! Try again.',
			}
		}
		
	}
	async deleteSurvey(questions_id){
		try {
			const survey = await Question.findById(questions_id).remove();

			return {
				deleted : true,
				message : "Survey deleted successfully!"
			}
		}
		catch(err){
			return {
				deleted : false,
				message : "Something went wrong!"
			}
		}
		return 'question ' + questions_id + ' has been deleted!!!' ;
	}
	processSurveyResponses(questions/** Object **/,responses/** Array **/){
		// const questions.options = responses.responses[0].options;
		// const
		for (var i = 0; i < questions.questions.length; i++) {

			// Result of an individual question ! ! !
			const resultOfQuestion = [];

			// Check if question type wheather if multiple choice or one choice or short paragraph
			if ( questions.questions[i].type === 'OneChoice' ){
				// console.log("oneChoice");

				// Get all options of an individual question ! ! !
				const options = questions.questions[i].options;

				// Loop over options to compare them within response results
				for (var k = 0; k < options.length; k++) {
					// Push initial zeros in the resultOfQuestions array for
					// increment some of them if possible 
					resultOfQuestion.push(0);

					// Loop over responses in the database ! ! !
					for (var o = 0; o < responses.length; o++) {

						if (options[k] === responses[o].responses[i].result[0]){/***************************/

						resultOfQuestion[k]++;

						} else { continue; }
					}			
				}

				// Push resultOfQuestion to the individual quetion 
				questions.questions[i].result = resultOfQuestion;

			}
			else if ( questions.questions[i].type === 'MultipleChoice' ){
				// console.log("MultipleChoice");

				// Get all options of an individual question ! ! !
				const options = questions.questions[i].options;

				// Loop over options to compare them within response results
				for (var k = 0; k < options.length; k++) {
					// Push initial zeros in the resultOfQuestions array for
					// increment some of them if possible 
					resultOfQuestion.push(0);

					// Loop over responses in the database ! ! !
					for (var o = 0; o < responses.length; o++) {
						// Loop over result of single respone to compare them within options
						for (var x = 0; x < responses[o].responses[i].result.length; x++) {
							
							if (options[k] === responses[o].responses[i].result[x]){/***********************/

							resultOfQuestion[k]++;

							} else { continue; }
						}
					}			
				}

				// Push resultOfQuestion to the individual quetion 
				questions.questions[i].result = resultOfQuestion;
			}
			else if ( questions.questions[i].type === 'ShortParagraph' ){
				// console.log("ShortParagraph");
				continue;
			}
		}

		// Output the the result attached in questions
		return { 
			processed: true,
		 	data : questions
		};

	}
	validateSurvey(){

	}
}


module.exports = Questions;