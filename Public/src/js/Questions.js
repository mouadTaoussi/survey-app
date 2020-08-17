import axios from 'axios';
import * as firebase from 'firebase/app'; 
import 'firebase/auth';
import 'firebase/storage';

// Init Firebase config
var firebaseConfig = {
	apiKey: 'AIzaSyCZOF-uWWTdgLws_q5alpSpTKwtm39ptOM',
	authDomain: 'survey-app-storage.firebaseapp.com',
	databaseURL: 'https://survey-app-storage.firebaseio.com',
	storageBucket: 'survey-app-storage.appspot.com'
};

// Init app and authenticate
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
var surveyFilesRef = storage.ref('/survey');
var avatarsRef = storage.ref('/avatars');

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