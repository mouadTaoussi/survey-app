const Question                             = require('.././Models/QuestionsModel.js');
const uuid                                 = require('uuid');

class Questions {
	async addSurvey(questions){
		try {
			// Attach ids for each question
			// uuid.v4()
			for (var i = 0; i < questions.questions.length; i++) {
				questions.questions[i]._id = uuid.v4()
			}

			const saving = await Question(questions).save();

			return {
				saved : true, message : 'Saved your work!', survey_id : saving.id, survey: saving
			}
		}catch(err){
			return {
				saved : false, message : 'Something went wrong! Try again.', survey_id: null, survey: null
			}
		}
	}
	async findSurvey(user_id,survey_id){

		try {
			// To get list of user surveys
			if ( user_id !== null && survey_id === null ){
				
				const surveys = await Question.find({ user_id: user_id });
				
				return {
					found : true, data : surveys, message : ""
				}
			}
			// To get the survey for edit 
			else if ( user_id !== null && survey_id !== null ) {

				const survey = await Question.findOne({ _id: survey_id, user_id: user_id });

				if ( survey !== null ) {
					return { found : true, data : survey, message : "" }	
				}
				else {
					return { found : false, data : null, message : "" }
				}
			}
			// To get a survey by its id 
			else if ( user_id == null && survey_id !== null ){
				
				const survey = await Question.findOne({ _id: survey_id });

				if ( survey !== null ) {
					return { found : true, data : survey, message : "" }	
				}
				else {
					return { found : false, data : null, message : "" }
				}
			}
			else {
				return { found : false, data : null, message : "" }
			}
		}
		catch (err){
			return {
				found : false, message : "Something went wrong!", data : null
			}
		}

	}
	async findMany(limit){
		try {
			// Update or save changes
			const surveys = await Question.find().limit(limit);
			
			// return
			return {
				found : true, data : surveys
			}
		}
		catch (err){
			// return
			return {
				found : false, message : err.message,
			}
		}
	}
	async updateSurvey(questions_id,questions){
		try {
			// When the user sorts the questions order, then the question_ids changed or diappered
			// SOLVED! Solution is keep those ids somewhere (front-end might be)

			// generating new ids for new questions in the updatinng process
			for (var i = 0; i < questions.questions.length; i++) {

				if (!!questions.questions[i]._id) {
					continue;
				}else {
					questions.questions[i]._id = uuid.v4();
				}
			}

			// Update or save changes
			const saving = await Question.findByIdAndUpdate(questions_id,questions,{ new : true });
			
			// return
			return {
				saved : true, message : 'Saved your work!', survey_id : questions_id, survey: saving
			}
		}
		catch (err){
			// return
			return {
				saved : false, message : err.message,survey_id: null, survey: null
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
		for (var i = 0; i < questions.questions.length; i++) {
			// Result of an individual question ! ! !
			const resultOfQuestion = [];
			if ( 
				questions.questions[i].type === 'MultipleChoice' 
									|| 
				questions.questions[i].type === 'OneChoice' 
				)
			{
				// Get all options of an individual question ! ! !
				const options = questions.questions[i].options;
				// Loop over options to compare them within response results
				for (var k = 0; k < options.length; k++) {
					// Push initial zeros in the resultOfQuestions array for
					// increment some of them if option and result got matched
					resultOfQuestion.push(0);
					// Loop over responses in the database ! ! !
					for (var o = 0; o < responses.length ; o++) {
						// Find the responses of each question
						const responseOfTheQuestion = responses[o].responses.filter((response)=>{
							return response.question_id == questions.questions[i]._id;
						});
						// Might be the question is removed so no longer we can find it's responses
						if (responseOfTheQuestion[0] == undefined) {
							continue;
						}
						else {
							// Loop over result of single response to compare them within options of the current question
							for (var x = 0; x < responseOfTheQuestion[0].result.length; x++) {
								
								if (options[k] === responseOfTheQuestion[0].result[x]){

								resultOfQuestion[k]++; /// Increment by one due to option and result matching

								} else { continue; }
							}
						}
					}
				}
				// Push resultOfQuestion to the individual question 
				questions.questions[i].result = resultOfQuestion;
			}
			else if ( questions.questions[i].type === 'ShortParagraph' ){
				var shortParagraphes = [];
				// Loop over responses in the database ! ! !
				for (var o = 0; o < responses.length; o++) {
					// Find the responses of each question
					const responseOfTheQuestion = responses[o].responses.filter((response)=>{
						return response.question_id == questions.questions[i]._id;
					});
					// Might be the question is removed so no longer we can find it's responses
					if (responseOfTheQuestion[0] == undefined) {
						continue;
					} 
					else {
						if (responseOfTheQuestion[0].result[0] !== null){

							// Push resultOfQuestion to the individual quetion 
							questions.questions[i].result.push(responseOfTheQuestion[0].result[0]);	

						}
						else { continue }
					}	
				}
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

/*1*/
/// Check if the questions length is same to thier respnoses length by check  
/// if responses[o].responses[i] !== undefined
/// We check them if they has same length becasue the survey owner might add one more question 
/// that thier response doesnt exists in the previous responses in the database
/// so if we compare questions with responses as normal we gonna get undefined
/// to the added question due to existance of response in the previous responses	
module.exports = Questions;
