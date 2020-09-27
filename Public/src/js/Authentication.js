import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { connection } from './firebaseConnection';


if (window.location.pathname === "/dashboard" ) {
	// Firebase connection
	const usersAvatar = connection().ref('/usersAvatar');
	/*
		So when you run the file over webpack, webpack will try not to litter the global scope 
		and so the function will not be made available globally by default.
		If you want the function to be accessible outside the scope of The JS file,
		you should put it in the global scope (window).
	*/
	// Get the files and init them
	// Upload the files to firebase
	window.getAvatar = (event)=>{
		const file = event.target.files[0];
		const avatarPreview = document.querySelector('.logo-of-user');
		// ERROR MESSAGE
		const errorMessage  = "Something went wrong! Try again." 
		// Check the file type
		const allowedFileTypes = [
			// "image/gif",
			"image/apng",
			"image/flif",
			"image/webp",
			"image/jpeg",
			"image/png",
		];
		// init foundOne to check wheater the file type included in the allowedFileTypes above
		var foundOne = false;
		
		for (var i = 0; i < allowedFileTypes.length; i++) 
		{
			// Checking...
			if ( allowedFileTypes[i] === file.type ) 
			{
				// generate a file indentifier
				const uuid = uuidv4();
				// Upload file 
				const uploadTask = usersAvatar.child(uuid).put(file)
				.then((snapshot)=>{
					// Get the download url 
					usersAvatar.child(uuid).getDownloadURL()
					.then((url)=>{
						
						// Include the download url in the user avatar preview
						avatarPreview.src = url;
						// and send it to the database
						// axios
						axios({ url: '/auth/updateUser', method : 'POST', data : { avatar : url }
						})
						.then((response)=>{
							window.displayAlertMessage(response.data.saved,response.data.message);
						})
						.catch((err)=>{ alert(err); })
					})
					.catch((err)=>{ alert(errorMessage) })
				})
				.catch((err)=>{ alert(errorMessage) })

				// Found one
				foundOne = true;
			}
			else 
			{
				continue;
			}
		}
		// Error message
		if (!foundOne) 
		{
			alert("Please check your avatar's type wheater if it ( apng | webp | jpeg | jpg | png )")
		}
	}

	// Update user
	window.updateUser = ()=>{
		// Get the user inputs 
		const bodyData = {
			firstName : document.querySelector('#firstName').value,
			givenName : document.querySelector('#givenName').value,
			username  : document.querySelector('#username').value,
			email     : document.querySelector('#email').value 
		}
		// ERROR MESSAGE
		const errorMessage  = "Something went wrong! Try again." 
		
		// Save it in the database 
		// axios
		axios({ url: '/auth/updateUser', method : 'POST', data : bodyData
		})
		.then((response)=>{
			// Display alert message
			window.displayAlertMessage(response.data.saved,response.data.message);
		})
		.catch((err)=>{ alert(errorMessage); })
	}
	// Regenerate an API KEY and revoke the current one
	window.regenerateAPIKEY = ()=>{

		// Regenerate one
		axios({
			method: "GET",
			url   : "/auth/regenerateapikey",
		})
		.then((response)=>{
			// Inject that new API KEY
			document.querySelector('#apiKey').value = response.data.apiKey;
		})
		.catch((err)=>{
			// Display alert message
			window.displayAlertMessage(response.data.saved,response.data.message);
		})
	}
}

