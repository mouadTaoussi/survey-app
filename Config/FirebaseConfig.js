const firebase                        = require('firebase-admin');


module.exports = {
	firebaseConnection: ()=>{
		const config = {
			apiKey: process.env.FIREBASE_API_KEY,
		    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		    databaseURL: process.env.FIREBASE_DATABASE_URL,
		    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
		};
		try{
			console.log("[INFO]: Firebase database is and running!");
			return firebase.initializeApp(config);
		}
		catch(err){
			console.log("[ERROR]: Database isn't and running!");
			throw new Error(err);
		}
	}
}