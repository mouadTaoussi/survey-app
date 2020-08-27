const Question                             = require('.././Models/QuestionsModel.js');

class Questions {
	async addSurvey(questions){
		try {
			const saving = await Question(questions).save();

			return {
				saved : true,
				message : 'Saved your work!',
				survey_id : saving.id
			}
		}catch(err){
			return {
				saved : false,
				message : 'Something went wrong! Try again.'
			}
		}
	}
	async findSurvey(options/*Object of options*/){
		const user_id    = options.user_id === null  || options.user_id === undefined  ? null : options.user_id;
		const survey_id  = options.survey_id === null  || options.survey_id === undefined  ? null : options.survey_id;

		try {
			if (user_id !== null || survey_id === null){

				const surveys = await Question.find({user_id});

				return {
					found : true,
					survey : surveys
				}
			}
			else if (survey_id !== null || user_id === null) {

				const survey = await Question.findOne({user_id});

				return {
					found : true,
					survey : survey
				}
			}
		}
		catch (err){
			return {
				found : true,
				message : "Something went wrong!"
			}
		}
	}
	async updateSurvey(questions_id,questions){

		try {
			// Update or save changes
			const saving = await Question.findByIdAndUpdate(questions_id,questions);
			
			// return
			return {
				saved : true,
				message : 'Saved your work!',
				survey_id : questions_id
			}
		}
		catch (err){
			// return
			return {
				saved : false,
				message : 'Something went wrong! Try again.',
			}
		}
		
	}
	deleteSurvey(questions_id){
		return 'question ' + questions_id + ' has been deleted!!!' ;
	}
	processSurveyResponses(questions/** Object **/,responses/** Array **/){
		// const questions.options = responses.responses[0].options;
		// const

		for (var i = 0; i < questions.question.length; i++) {

			// Result of an individual question ! ! !
			const resultOfQuestion = []; 
			
			// Check if question type wheather if multiple choice or one choice or short paragraph
			if ( questions.question[i].type === 'OneChoice' ){
				console.log("oneChoice");
				// console.log(questions.question[i]);
				// Get all options of an individual question ! ! !
				const options = questions.question[i].options;

				// console.log(options)

				// Loop over options to compare them within response results
				for (var k = 0; k < options.length; k++) {
					// Push initial zeros in the resultOfQuestions array for
					// increment some of them if possible 
					resultOfQuestion.push(0);

					// console.log(options[k])
					// Loop over responses in the database ! ! !
					for (var o = 0; o < responses.length; o++) {

						// console.log(responses[o].response[i]);
						if (options[k] === responses[o].response[i].result[0]){

							// result.push(options[k]);
							resultOfQuestion[k]++;

						}
						else {
							continue;
						}
					}			
				}

				// Push resultOfQuestion to the individual quetion 
				questions.question[i].result = resultOfQuestion;
				

			}
			else if ( questions.question[i].type === 'MultipleChoice' ){
				console.log("MultipleChoice");
				// console.log(questions.question[i]);
				// Get all options of an individual question ! ! !
				const options = questions.question[i].options;

				// console.log(options)

				// Loop over options to compare them within response results
				for (var k = 0; k < options.length; k++) {
					// Push initial zeros in the resultOfQuestions array for
					// increment some of them if possible 
					resultOfQuestion.push(0);

					// console.log(options[k])
					// Loop over responses in the database ! ! !
					for (var o = 0; o < responses.length; o++) {
						// Loop over result of single respone to compare them within options
						for (var x = 0; x < responses[o].response[i].result.length; x++) {
							
							// console.log(responses[o].response[i]);
							if (options[k] === responses[o].response[i].result[x]){

								// result.push(options[k]);
								resultOfQuestion[k]++;

							}
							else {
								continue;
							}
						}
					}			
				}

				// Push resultOfQuestion to the individual quetion 
				questions.question[i].result = resultOfQuestion;
			}
			else if ( questions.question[i].type === 'ShortParagraph' ){
				console.log("ShortParagraph");
				continue;
			}
		}
		// Output the the result attached in questions
		return questions;

	}
	validateSurvey(){

	}
}


module.exports = Questions;