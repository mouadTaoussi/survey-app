import Sortable  from 'sortablejs';
// import jquery from 'jquery';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '.././css/style.css';
import './vendors/fontawesome/css/all.css';
import './Questions.js';
import './Authentication.js';
import './Responses.js';
import './DomManupilation.js';


// Dynamic alert message
window.displayAlertMessage = (messageType,message)=>{
	/**
	 *
	 * Message type: bloean type: if (false) message is for something has failed
	 * and the reverse is correct
	 *
	 **/
	if (messageType){
		// Play the success ringtone
		document.querySelector("#ringtone-message-success").play(); 
		// Display message alert after one second because the sound starts a bit slowly
		window.setTimeout(()=>{
			// Set the message color
			document.querySelector('.side-alert-message').classList.add('success');
			// Set the message content
			document.querySelector('.side-alert-message').innerHTML = message;
			// Display the dynamic success message
			document.querySelector('.side-alert-message').style.right = '20px';
		},800)
		window.setTimeout(()=>{
			// unDisplay the dynamic success message
			document.querySelector('.side-alert-message').style.right = '-320px';
			// Remove the message
			// document.querySelector('.side-alert-message').innerHTML = null;
			// Remove the class
			document.querySelector('.side-alert-message').classList.remove('success');
		},8000)
	}else {
		// Play the success ringtone
		document.querySelector("#ringtone-message-danger").play(); 
		// Display message alert after one second because the sound starts a bit slowly
		window.setTimeout(()=>{
			// Set the message color
			document.querySelector('.side-alert-message').classList.add('danger');
			// Set the message content
			document.querySelector('.side-alert-message').innerHTML = message;
			// Display the dynamic success message
			document.querySelector('.side-alert-message').style.right = '20px';
		},800)
		window.setTimeout(()=>{
			// unDisplay the dynamic success message
			document.querySelector('.side-alert-message').style.right = '-320px';
			// Remove the message
			// document.querySelector('.side-alert-message').innerHTML = null;
			// Remove the class
			document.querySelector('.side-alert-message').classList.remove('danger');

		},8000)
	}
}

// Copy link function
document.querySelector('#copyLinkBtn').addEventListener('click',function(){
	// Get the box where the text belongs
	const box = document.querySelector('.inputLink');
	// Select it!
	box.select()
	// Copy it!
	document.execCommand('copy');

	document.querySelector('#copyLinkBtn').innerHTML = "Copied!";
})

// Grab Questions list
const questions_list = document.querySelector('.questions_list');

// Init sortable js
const sortable = new Sortable(questions_list,{
	handle: ".dragable",
	animation: 550,
})
