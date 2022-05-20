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
	document.querySelector('.btn-save-changes').addEventListener('click', saveSurveyChanges);
	// auto save feature 
	setInterval(()=>{ saveSurveyChanges('SurveyApp auto saved your work!') }, 65000);

	function saveSurveyChanges (message = null){
	 	console.log(1)
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
			
			for (var o = 0; o < questions_list[i].children[2].children[0].children.length; o++) {

				options.push(questions_list[i].children[2].children[0].children[o].children[0].value);

			}

			single_question._id      =  questions_list[i].children[4] == undefined ? undefined : questions_list[i].children[4].innerHTML;
			single_question.required = true;
			single_question.options  = options;
			// single_question.file     = questions_list[i].children[2].children[0].placeholder || null;
			single_question.title    = questions_list[i].children[1].value;
			single_question.type     = questions_list[i].children[3].children[0].value;
			survey.questions.push(single_question);

		}
		
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

				window.displayAlertMessage(response.data.saved, message || response.data.message);
				// Attach that id in the the html element to use it whenever user hit save 
				// to prevent adding one more survey and just update it instead
				// Check : Controllers/Questions.js
				// 	     : Routes/Questions.js
				document.querySelector('.survey_id').innerText = response.data.survey_id;
				
				// Attach questions ids to each question to track its position (after user sorts questions) in the question list
				for (var i = 0; i < response.data.survey.questions.length; i++) {
					questions_list[i].children[4].innerHTML = response.data.survey.questions[i]._id;
					// TypeError: Failed to set an indexed property on 'HTMLCollection': Indexed property setter is not supported.
				}

			}
			
		})
		.catch((err)=>{
			// @ERROR cannot save impprted survey
			console.log(err)
			// window.displayAlertMessage( false,err );
		})
	}
	// Importing another questions
	window.importQuestions = function(){
		// Get the survey id wanted to be imported as well as questions list to put the imported questions to
		const import_survey_id = document.querySelector('.import_survey_id');
		const questions_list   = document.querySelector('.questions_list');
		const selected = "selected";
		const nothing = "";

		if (import_survey_id.value == "" ){
			alert('Provide us a survey id you want to import');
		}else {
			axios({
				method : 'GET',
				url : "/question/importQuestions?survey_id=" + import_survey_id.value,
			})
			.then((response)=>{
				// Displaying questions in questiion list
				window.displayAlertMessage( response.data.found,response.data.message );
				// Create options
				var options;

				
				// Loop over questions to display each one of them!!!
				for (var i = 0; i < response.data.data.length; i++) {

					for (var io = 0; io < response.data.data[i].options.length; io++) {
					
						options += `
							<li class="option-item">
								<input type="text" placeholder="Option" class="form-control" value="${response.data.data[i].options[io]}" required>
								<i onclick="deleteOption(event)" class="delete-option fas fa-times"></i>
							</li>
						`

					}
					const single_question =  `
					<div class="single-question local-card local-mt-2 local-p-2 local-shadow" draggable='true'>
						<!-- Dragable section -->
						<div class="dragable">
							<div></div><div></div><div></div>
							<div></div><div></div><div></div>
						</div>
						<!-- Quetsion or title -->
						<input 
							class="form-control mt-2" 
							placeholder='Type your question here'
							value="${response.data.data[i].title}" 
							required
						>
						<!-- Files inputs -->
						<!-- Options -->
						<div class="options-area">
							<ul class="options-list">
								` + options  + `
							</ul>
							<p class="add-new-option btn btn-warning btn-sm">Add option</p>
						</div>
						<!-- Settings -->
						<div class="question_settings">
							<select style="display: inline;width: 180px;" class='form-control'>
								<option ${ response.data.data[i].type == "MultipleChoice" ? selected : nothing }>MultipleChoice</option>
								<option ${ response.data.data[i].type == "OneChoice" ? selected : nothing } >OneChoice</option>
								<option ${ response.data.data[i].type == "ShortParagraph" ? selected : nothing }>ShortParagraph</option>
							</select>
							<i onclick="deleteField(event)" style="display: inline" class="delete-field mx-2 far fa-trash-alt"></i>
						</div>
					</div>`

					// Push that single question to the question list
					questions_list.innerHTML += single_question;
					options = [];

					// Update nodelist that contains buttons of <add option> when we import questions 
					window.updateNodeList();
				}
			})
			.catch((err)=>{
				// window.displayAlertMessage( false,err.message );
				console.log(err)
			})
		}
	}
}

// Delete questions (survey)
window.deleteSurvey = function(event,survey_id){
	// Makeing sure that the user wants t delete the current survey
	const confirmation = window.confirm('Do you want to delete this survey?');

	if (confirmation == false) return 'Canelled';

	// Axios request
	axios({
		url : '/question/'+ survey_id,
		method : "DELETE",
	})
	.then((response)=>{
		console.log(response)
		if ( response.data.deleted ) {

			// Remove the current survey
			event.path[2].remove();

			// Display dynamic message
			window.displayAlertMessage(response.data.deleted, response.data.message);
		}
		else {
			// Display dynamic message
			window.displayAlertMessage(response.data.deleted, response.data.message);
		}
		
	})
	.catch((err)=>{
		// Display dynamic message
		window.displayAlertMessage( false,"Something went wrong!" );
	})
}