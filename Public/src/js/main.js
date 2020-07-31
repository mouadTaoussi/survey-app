import '.././css/style.css';
import './vendors/fontawesome/css/all.css';
import axios from 'axios';


// window.onload = ()=>{
// 	alert('Hello World')
// }
// window.setTimeout(()=>{
// 	alert('Hello World')
// },2000)

console.log('Hello World');

if (window.location.href=== "http://localhost:8080/dashboard"){

	console.log("dashboard");
	
}else if (window.location.href=== "http://localhost:8080/surveyEditor") {

	var ctx = document.querySelectorAll("#canvas").forEach((canva)=>{
		// ctx.canvas.width = 300;
		// ctx.canvas.height = 300;
		const ctx = canva.getContext("2d");

		const data = {
		    datasets: [{
		        data: [10, 20, 30,50,20],
		         backgroundColor: [
		                "#00b894"/*"#FF6384"*/,
		                "#0984e3"/*"#36A2EB"*/,
		                "#d63031"/*"#FFCE56"*/,
		                "#f53b57",
		                "#ffa801"
		            ]
		            // hoverBackgroundColor: [
		            //     "#FF6384",
		            //     "#36A2EB",
		            //     "#FFCE56"
		            // ]
		    }],

		    // These labels appear in the legend and in the tooltips when hovering different arcs
		    labels: [
		        'Other',
		        'I dont think',
		        'Yep',
		        'Nope',
		        'Not sure',
		    ]
		};
		// For a pie chart
		var myPieChart = new Chart(ctx, {
		    type: 'pie',
		    data: data,
		    options: {
		        legend: {
		            display: true,
		            labels: {
		                fontColor: 'rgba(0, 0, 0,.60)',
		                position: 'right'
		            }
		        }
		    }
		});
	});
}




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