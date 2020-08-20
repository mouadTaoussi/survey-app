import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { connection } from './firebaseConnection';


if (window.location.pathname === "/surveyEditor" ){
	// Firebase connection
	const surveyFiles = connection().ref('/surveyFiles');
	/*
		When you run the file over webpack, webpack will try not to litter the global scope 
		and so the function will not be made available globally by default.
		If you want the function to be accessible outside the scope of The JS file,
		you should put it in the global scope (window).
	*/
	// Get the files and init them
	window.getFile = (event) => {
		const file = event.target.files[0];
		// Check the file type
		const allowedFileTypes = [
			"application/msword",
			"application/pdf",
			"application/zip",
			"image/gif",
			"image/apng",
			"image/flif",
			"image/webp",
			"image/jpeg",
			"image/png",
			"audio/mpeg",
			"audio/ogg"
		];
		// init foundOne to check wheater the file type included in the allowedFileTypes above
		var foundOne = false;

		for (var i = 0; i < allowedFileTypes.length; i++) {
			// Checking ...
			if (allowedFileTypes[i] === file.type){
				// generate a file indentifier
				const uuid = uuidv4();
				// Upload file 
				const uploadTask = surveyFiles.child(uuid).put(file,{filename:'PDF'})
				.then((snapshot)=>{

					// Run a task to get the progression
					// uploadTask.on('state_changed').then((state)=>{
					// 	console.log(state)
					// })
					// 	// Run a task to get the progression
					// 	// Run a task to let user stop or cancel the upload process
					// Run a task to let user stop or cancel the upload process
					// Get the download url and pass it to the Dom for use it below if the user hits save
					surveyFiles.child(uuid).getDownloadURL()
					.then((url)=>{
						console.log(url);
						// Include the download url into the input for use it in the function below
						// For save it and thier approprite question in database 
					})
					.catch((err)=>{
						alert('Something sent wrong! Try again1');
					})
					
				})
				.catch((err)=>{
					alert('Something went wrong! Try again2');
				})
				
				// Found one
				foundOne = true;
			}
			else {
				continue;
			}
		}
		// Check the foundOne if true or false
		if(!foundOne){
			alert('This file type is not allowed!');
		}
	}
	
	// Save questions (survey) // Update questions (survey)
	document.querySelector('.btn-save-changes')
	 .addEventListener('click',()=>{
	 	
		// Init survey output
		let survey = {};

		// Get the survey info
		const survey_info    = document.querySelector('.desc');

		// Get the question list
		const questions_list = document.querySelectorAll('.single-question');

		// Insert questions (survey) info
		survey.questions = [];
		survey.user_id = null;
		survey.description = survey_info.children[1].innerHTML;
		survey.title = survey_info.children[0].innerHTML;
		survey.active = true; 

		// Format the questions and convert them to JSON
		for (var i = 0; i < questions_list.length; i++) {

			let single_question = {};
			let options = [];
			single_question.options = [];

			for (var o = 0; o < questions_list[i].children[3].children[0].children.length; o++) {

				options.push(questions_list[i].children[3].children[0].children[o].children[0].value);
				
			}

			single_question.required = true;
			single_question.options  = options;
			single_question.title    = questions_list[i].children[1].value;
			single_question.type     = questions_list[i].children[4].children[1].value;
		
			survey.questions.push(single_question);

		}
		console.log(survey);
		
		// Upload the files to firebase
		// Upload the questions to the database
	})
	// Receive questions (survey)
	// Delete questions (survey)
	// Disable questions (survey)
}