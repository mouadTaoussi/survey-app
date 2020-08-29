import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { connection } from './firebaseConnection';


if (window.location.pathname === "/surveyEditor" ){
	// Firebase connection
	const surveyFiles = connection().ref('/surveyFiles');
	// ERROR MESSAGE
	const errorMessage  = "Something went wrong! Try again." 
	/*
		When you run the file over webpack, webpack will try not to litter the global scope 
		and so the function will not be made available globally by default.
		If you want the function to be accessible outside the scope of The JS file,
		you should put it in the global scope (window).
	*/
	// Get the files and init them
	// Upload the files to firebase
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

					// Get the download url and pass it to the Dom for use it below if the user hits save
					surveyFiles.child(uuid).getDownloadURL()
					.then((url)=>{
						
						alert('This file uploaded successfully')
						// Include the download url into the input for use it in the function below
						// For save it and thier approprite question in database
						event.path[0].placeholder = url;

					}).catch((err)=>{ alert(errorMessage); });
					
				}).catch((err)=>{ alert(errorMessage); });
				
				// Found one
				foundOne = true;
			}
			else {
				continue;
			}
		}
		// Check the foundOne if true or false
		if(!foundOne){ alert('This file type is not allowed!'); }
	}

	// Save questions (survey) // Update questions (survey)
	document.querySelector('.btn-save-changes').addEventListener('click',()=>{
	 	
		// Init survey output
		let survey = {};

		// Get the survey info
		const survey_info    = document.querySelector('.desc');

		// Get the question list
		const questions_list = document.querySelectorAll('.single-question');

		// Insert questions (survey) info
		survey.questions   = [];
		survey.user_id     = null;
		survey.description = document.querySelector('.survey-description').value;/*survey_info.children[0].value;*/
		survey.title       = document.querySelector('.survey-title').value;/*survey_info.children[1].value;*/
		survey.active      = true; 
		survey.id          = document.querySelector('.survey_id').innerText !== "---" ? document.querySelector('.survey_id').innerText : null; 

		// Format the questions and convert them to JSON
		for (var i = 0; i < questions_list.length; i++) {

			let single_question     = {};
			let options             = [];
			single_question.options = [];

			for (var o = 0; o < questions_list[i].children[3].children[0].children.length; o++) {

				options.push(questions_list[i].children[3].children[0].children[o].children[0].value);
				
			}

			single_question.required = true;
			single_question.options  = options;
			single_question.file     = questions_list[i].children[2].children[0].placeholder || null;
			single_question.title    = questions_list[i].children[1].value;
			single_question.type     = questions_list[i].children[4].children[1].value;
		
			survey.questions.push(single_question);

		}
		console.log(survey);
		
		
		// Save the questions to the database
		axios({
			url : "/question",
			method : 'POST',
			data : survey
		})
		.then((response)=>{
			
			if (response.data.saved == false) {
				window.displayAlertMessage(response.data.saved,response.data.message);
			}
			else {

				window.displayAlertMessage(response.data.saved,response.data.message);
				// Attach that id in the the html element to use it whenever user hit save 
				// to prevent adding one more survey and just update it instead
				// Check : Controllers/Questions.js
				// 	     : Routes/Questions.js
				document.querySelector('.survey_id').innerText = response.data.survey_id;
			}
			
		})
		.catch((err)=>{
			alert(err);
		})
	})
	// Receive questions (survey)
	// Delete questions (survey)
	// Disable questions (survey)
}