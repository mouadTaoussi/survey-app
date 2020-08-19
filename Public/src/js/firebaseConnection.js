import * as firebase from 'firebase/app'; 
import axios from "axios";
import 'firebase/storage';


function connection(){
	// Init Firebase config
	// We ganna get the firebase config from the server with the authorization session
	// Because our cloud-storage is open for public
	// let firebaseConfig = {};
	// // Get them
	// axios.get('/auth/getFirebaseConfig')
	//  .then((config)=>{
	//  	firebaseConfig.apiKey = config.data.apiKey;
	//  	firebaseConfig.authDomain = config.data.authDomain;
	//  	firebaseConfig.databaseURL = config.data.databaseURL;
	//  	firebaseConfig.storageBucket = config.data.storageBucket;
	//  	firebaseConfig.projectId = config.data.projectId;
	//  })
	//  .catch((err)=>{
	// 	alert('Something went wrong!')
	//  })
	var firebaseConfig = {
	    apiKey: 'AIzaSyCZOF-uWWTdgLws_q5alpSpTKwtm39ptOM',
	    authDomain: 'survey-app-storage.firebaseapp.com',
	    databaseURL: 'https://survey-app-storage.firebaseio.com',
	    storageBucket: 'survey-app-storage.appspot.com'
	 };

	// Init app and authenticate
	firebase.initializeApp(firebaseConfig);

	// Get a reference to the storage service, which is used to create references in your storage bucket
	return firebase.storage();
}

export { connection };