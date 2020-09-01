import { Chart } from 'chart.js';
import axios from 'axios';


// Submit response
// Get the responses and display them
var ctx = document.querySelectorAll("#canvas").forEach((canva)=>{
	// Axios
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

// Submit response 
window.submitSurveyResponse = ()=>{
	// Get question ID
	const urlParams = new URLSearchParams(window.location.search);
	const survey_id = urlParams.get('survey_id');

	// Init the responses object
	const survey_responses      = {};
	survey_responses.responses  = [];

	const single_responses = document.querySelectorAll('.single-response');

	// Get response info 
	survey_responses.survey_id = survey_id;

	// Get responses 
	for (var i = 0; i < single_responses.length; i++) {

		// Init the response
		const response = {};

		// Fill that object to the response object
		response.title = single_responses[i].children[0].innerText;
		response.type = single_responses[i].children[1].innerText;

		// Get the answer 
		if ( response.type === "OneChoice" ){
			response.result = [single_responses[i].children[2].children[0].value];
		}
		else if ( response.type === "MultipleChoice" ) {
			response.result = single_responses[i].children[2].children;	
		}
		else if ( response.type === "ShortParagraph" ){
			response.result = [single_responses[i].children[2].children[0].value];	
		}


		// Push response to the object 
		survey_responses.responses.push(response);
	}
	console.log(survey_responses)
}

// {
// 	question_id : "dfib nifdcubnisdn",
// 	response : [
// 		{
// 				type : 'OneChoice',
// 				question : "how many pro langs you know?",
// 				result : [2]
// 		},
// 		{   
// 				type : 'MultipleChoice',
// 				question : "which langs you know?",
// 				result : ['go']
// 		}
// 	]
// },