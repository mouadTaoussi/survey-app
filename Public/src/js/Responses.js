import { Chart } from 'chart.js';
import axios from 'axios';


axios({
	url : "/response/processSurveyResponses",
	method : "GET",
})
.then((response)=>{
	if ( response.data.processed == false ) {
		window.displayAlertMessage( response.data.processed, response.data.message );
	}
	else {
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
	}
})
.catch((error)=>{
	window.displayAlertMessage( response.data.processed, response.data.message );
})



// Submit response // Submit response
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

		// Init that response object
		response.title = single_responses[i].children[0].innerText;
		response.type = single_responses[i].children[1].innerText;

		// Get the answer 
		if ( response.type === "OneChoice" ){
			response.result = [single_responses[i].children[2].children[0].value];
		}
		else if ( response.type === "MultipleChoice" ) {

			// Init an array to push checkboxes to it!
			const checkboxs = [];
			const checkeds = [];

			//Loop over Options to get the checkoxes inputs
			for (var o = 0; o < single_responses[i].children[2].children.length; o++) {

				// Get checkbox inputs
				// We get just checkboxes rather than thier labels and br tags
				// For get the checked checkboxes
				if (single_responses[i].children[2].children[o].type === "checkbox" && single_responses[i].children[2].children[o].name === "option") {

					checkboxs.push(single_responses[i].children[2].children[o]);

				}
				else { continue }
			}

			// get the checked checkboxes and put thier values in the single response
			for (var io = 0; io < checkboxs.length; io++) {
				
				if (checkboxs[io].checked == true) {
					checkeds.push(checkboxs[io].value);
				}
				else { continue; }
			}
			// Push the checked options to the result array
			response.result = checkeds;

		}
		else if ( response.type === "ShortParagraph" ){
			response.result = [single_responses[i].children[2].children[0].value];	
		}


		// Push response to the object 
		survey_responses.responses.push(response);
	}

	// Send the response to the back-end for save it !!!
	axios({
		url : "/response/submitResponse",
		method : "POST",
		data : survey_responses
	})
	.then((response)=>{
		// window.displayAlertMessage( response.data.saved, response.data.message );
		console.log(response.data)
		alert("Thank you for giving us your time and submitting your answers!!")
	})
	.catch((error)=>{
		// window.displayAlertMessage( false,"Something went wrong!" );
		alert('Something went wrong! Try again.')
	})
}