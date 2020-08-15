import axios     from 'axios'; // Import just the required packages
import Chart     from 'chart.js'; // Import just the required packages
import Sortable  from 'sortablejs'; // Import just the required packages
// import jquery    from 'jquery';
import firebase  from 'firebase'; // Import just the required packages
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '.././css/style.css';
import './vendors/fontawesome/css/all.css';
// Grab local files
import './Authentication.js';
import './DomManupilation.js';
import './Questions.js';
import './Responses.js';

// Init Chart.js
var ctx = document.querySelectorAll("#canvas").forEach((canva)=>{
	const ctx = canva.getContext("2d");
	const data = {
	    datasets: [{
	        data: [10, 20, 30,50,20],
	        backgroundColor: ["#00b894","#0984e3","#d63031","#f53b57","#ffa801"]
	    }],
	    // These labels appear in the legend and in the tooltips when hovering different arcs
	    labels: ['Other','I dont think','Yep','Nope','Not sure',]
	};
	// For a pie chart
	var myPieChart = new Chart(ctx, {
	    type: 'pie',
	    data: data,
	    options: {
	        legend: { display: true,labels: {fontColor: 'rgba(0, 0, 0,.60)', position: 'right'}}
	    }
	});
});

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

// Grab Questions list
const questions_list = document.querySelector('.questions_list');

// Init sortable js
const sortable = new Sortable(questions_list,{
	handle: ".dragable",
	animation: 550,
})