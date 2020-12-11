import { Chart } from 'chart.js';
import axios from 'axios';


if ( window.location.pathname === "/surveyEditor" ){
	// Get results whenever the user hits response tab in the surveyEditor
	window.getResults = function(){
		// Check if the results already received
		if ( document.querySelector('.responses').children.length > 0 ) {
			return "already received results";
		}
		// Get question ID
		const urlParams = new URLSearchParams(window.location.search);
		const survey_id = urlParams.get('survey_id');
		const user_id = urlParams.get('user_id');

		// Get the response results and then display them in the chart
		axios({
			url : `/response/processSurveyResponses?survey_id=${survey_id}&user_id=${user_id}`,
			method : "GET",
		})
		.then((response)=>{
			console.log(response)
			if ( response.data.processed == false ) {
				window.displayAlertMessage( response.data.processed, response.data.message );
			}
			else {
				// Get the resposnes list 
				const responses_area = document.querySelector('.responses');

				// Result of the responses without of MultipleChoice and OneChoice without ShortParagraph
				// For use them to display charts
				var results_without_short_paragraph = [];

				// Display responses
				for (var i = 0; i < response.data.data.questions.length; i++) {

					var single_response; 
					// Check question type 
					if (response.data.data.questions[i].type === "ShortParagraph"){

						// Single response html
						single_response = `
						<div class='local-card local-mt-4 local-mb-2 local-pt-4 local-pb-4 local-shadow'>
							<h4 class="response-question">${response.data.data.questions[i].title}</h4>
							<p class="response-question-type">${response.data.data.questions[i].type}</p>
							<div style="overflow:scroll; height:250px;" class="paragraphes"></div>
						</div>`

						// Inject the single response to the responses area
						responses_area.innerHTML += single_response;

						// Get the area where the paragraphes should be placed
						const shortParagraphdiv = document.querySelectorAll('.paragraphes');

						for ( var io = 0; io < response.data.data.questions[i].result.length; io++ ) {

							if (response.data.data.questions[i].result[io] === '') {
								// Ignore th empty paragraph response
								continue
							}
							else {
								// Taking th last paragraph type response for inject paragraphes for it!!!
								shortParagraphdiv[shortParagraphdiv.length-1].innerHTML += `<p class="answres">${response.data.data.questions[i].result[io]}</p><br>`;	
							}

						}

						// Apply and Implement sme styles to the answres
						document.querySelectorAll(".answres")
						.forEach((answer)=>{
							answer.style.padding         = "8px 0 8px 15px";
							answer.style.margin          = ".2px"
							answer.style.backgroundColor = "#eff1f7";
							// answer.
						})

					}else {

						// Single response html
						single_response = `
						<div class='local-card local-mt-4 local-mb-2 local-pt-4 local-pb-4 local-shadow'>
							<h4 class="response-question">${response.data.data.questions[i].title}</h4>
							<p class="response-question-type">${response.data.data.questions[i].type}</p>
							<div class="chart-area">
								<canvas id="canvas${i}"></canvas>
							</div>
						</div>	
						`

						// Push just MultipleChoice and OneChoice results t use them below in charts
						// We didn't used array.push(v) because there are ShortParagraph, we wont use in the charts
						results_without_short_paragraph[i] = ({
							result  :  response.data.data.questions[i].result,
							options :  response.data.data.questions[i].options
						})

						// Inject the single response to the responses area
						responses_area.innerHTML += single_response;
					}

				}
				// Display Results charts
				for (var i = 0; i < results_without_short_paragraph.length; i++) {

					// Check if ( results_without_short_paragraph[i] !== undefined ) because we didnt pushed ShortParagraphes
					if( results_without_short_paragraph[i] !== undefined ) {

						// // Get the responses and display them
						let ctx = document.querySelector(`#canvas${i}`).getContext("2d");

						let data = {
						    datasets: [{
						        data: results_without_short_paragraph[i].result,
						        backgroundColor: [
						        "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
						        "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
						        "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
						        "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
						        "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
						        "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
						        ]
						    }],
						    // These labels appear in the legend and in the tooltips when hovering different arcs
						    labels: results_without_short_paragraph[i].options
						};
						// For a pie chart
						let myPieChart = new Chart(ctx, {
						    type: 'pie',
						    data: data,
						    options: {
						        legend: { position: 'right', labels: {fontColor: 'rgba(0, 0, 0,.60)'}}
						    }
						});

					}else { continue }
				}
			}
		})
		.catch((error)=>{
			window.displayAlertMessage( response.data.processed, response.data.message );
		})
	}
	
}

// Submit response // Submit response
window.submitSurveyResponse = ()=>{
	// Get question ID
	const urlParams = new URLSearchParams(window.location.search);
	const survey_id = urlParams.get('survey_id');

	// Check if the user already responded
	if (window.localStorage.getItem(survey_id).submitted) {
		alert('You Have already submitted your responses!');
		return;
	}

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
		alert("Thank you for giving us your time and submitting your answers!!");
		// Set a value in localstorage that contains a value means the user submitted response
		window.localStorage.setItem(survey_id,{ submitted: true });
	})
	.catch((error)=>{
		// window.displayAlertMessage( false,"Something went wrong!" );
		alert('Something went wrong! Try again.')
	})
}
