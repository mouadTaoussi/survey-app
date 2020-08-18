import * as firebase from 'firebase/app'; 
import axios from "axios";
import 'firebase/storage';


function connection(){
	// Init Firebase config
	// We ganna get the firebase config from the server with the authorization session
	// Because our cloud-storage is open for public
	let firebaseConfig = {};
	console.log()
	// Get them
	axios.get('/auth/getFirebaseConfig')
	 .then((config)=>{
	 	firebaseConfig.apiKey = config.data.apiKey;
	 	firebaseConfig.authDomain = config.data.authDomain;
	 	firebaseConfig.databaseURL = config.data.databaseURL;
	 	firebaseConfig.storageBucket = config.data.storageBucket;
	 	firebaseConfig.projectId = config.data.projectId;
	 })
	 .catch((err)=>{
		alert('Something went wrong!')
	 })
	console.log(firebaseConfig);
	// Init app and authenticate
	firebase.initializeApp(firebaseConfig);

	// Get a reference to the storage service, which is used to create references in your storage bucket
	var storage = firebase.storage();
	console.log(storage.app.name)
	return storage;
	// var surveyFilesRef = storage.ref('/survey');
	// var avatarsRef = storage.ref('/avatars');
}

export { connection };