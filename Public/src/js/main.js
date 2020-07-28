import '.././css/style.css';

console.log('Hello World');


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

console.log(storage)
console.log(surveyFilesRef)