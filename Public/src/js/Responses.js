import { Chart } from 'chart.js';
import axios from 'axios';
import { Pie } from '@antv/g2plot';


if ( window.location.pathname === "/surveyEditor" || window.location.pathname === "/resultsFullSceeen" ){
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
			console.log("response")
			if ( response.data.processed == false ) {
				window.displayAlertMessage( response.data.processed, response.data.message );
			}
			else {
				// Get the resposnes list 
				const responses_area = document.querySelector('.responses');
				// Put Responses count and display it to the user
				document.querySelector('.responsesNumber').innerHTML = response.data.responsesNumber;

				// Result of the responses without of MultipleChoice and OneChoice without ShortParagraph
				// For use them to display charts
				var results_without_short_paragraph = [];

				// Display responses
				for (var i = 0; i < response.data.data.questions.length; i++) {
console.log("response0")
					var single_response; 
					// Check question type 
					if (response.data.data.questions[i].type === "ShortParagraph"){

						// Single response html
						single_response = `
						<div class='response local-card local-mt-4 local-mb-2 local-pt-4 local-pb-4 local-shadow'>
							<h4 class="response-question">${response.data.data.questions[i].title}</h4>
							<p class="response-question-type">${response.data.data.questions[i].type}</p>
							<div style="overflow:scroll; height:250px;" class="paragraphes"></div>
						</div>`

						// Inject the single response to the responses area
						responses_area.innerHTML += single_response;
			console.log("response1")

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
console.log("response2")
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
						<div class='response local-card local-mt-4 local-mb-2 local-pt-4 local-pb-4 local-shadow'>
							<h4 class="response-question">${response.data.data.questions[i].title}</h4>
							<p class="response-question-type">${response.data.data.questions[i].type}</p>
							<div class="chart-area">
								<div id="canvas${i}"></div>
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
			console.log("response3")

				// Display Results charts
				for (var i = 0; i < results_without_short_paragraph.length; i++) {
			console.log("response4")

					// Check if ( results_without_short_paragraph[i] !== undefined ) because we didnt pushed ShortParagraphes
					if( results_without_short_paragraph[i] !== undefined ) {

						// Those functions are used if we are using G2Plot lib instead of ChartJS or FrappeJS
						const percentageDatasets = calculatePercentage(results_without_short_paragraph[i].result);
						const mergedData = mergeDataWithLabels(results_without_short_paragraph[i].options,percentageDatasets) 

						const piePlot = new Pie(`canvas${i}`, {
						  appendPadding: 10,
						  data: mergedData,
						  angleField: 'value',
						  colorField: 'type',
						  radius: 0.9,
						  label: {
						    type: 'inner',
						    offset: '-30%',
						    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
						    style: {
						      fontSize: 14,
						      textAlign: 'center',
						    },
						  },
						  interactions: [{ type: 'element-active' }],
						});

						piePlot.update({ 
							"theme": { 
								"styleSheet": { 
									"brandColor": "#215B77", 
									"paletteQualitative10": ["#215B77", "#1B9CD0", "#61C9FF", "#ABDFFF", "#FFDE94", "#FFC741", "#D09C10", "#795B16"], 
									"paletteQualitative20": ["#215B77", "#227BA2", "#1B9CD0", "#22BAED", "#61C9FF", "#8AD4FF", "#ABDFFF", "#C9E9FF", "#FFE9B8", "#FFDE94", "#FFD470", "#FFC741", "#EDB40A", "#D09C10", "#A37B16", "#795B16"] 
								} 
							} 
						})

						piePlot.render();
console.log("response5")

					}else { continue }
				}
			}
		})
		.catch((error)=>{
			window.displayAlertMessage( response.data.processed, response.data.message );
		})
		console.log("response6")
	}
	
}

// Submit response // Submit response
window.submitSurveyResponse = ()=>{
	// Get question ID
	const urlParams = new URLSearchParams(window.location.search);
	const survey_id = urlParams.get('survey_id');

	// Check if the user already responded
	if (window.localStorage.getItem(survey_id) != null) {
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
/**
*
*
* Algorithms that comes with G2Plot 
* (ALGORITHM That convert datasets to percentage- ALGORITHM That merge labels and values into json format)
*
*
**/
// Calculate the percentage of the datasets
function calculatePercentage (datasets){
	// sum of the datasets
	let total = 0; 
	// calculate the sum of datasets
	for (var i = 0; i < datasets.length; i++) {
		// sum
		total += datasets[i];
	}
	// calculate percentage of datasets
	for (var i = 0; i < datasets.length; i++) {
		datasets[i] = Math.floor(datasets[i] / total * 100);
	}
	return datasets;
}

// This function takes the labels and the datasets and put them into json format for be ready to G2Plot lib
function mergeDataWithLabels (labels,data){

	const results = [];

	for (var i = 0; i < labels.length; i++) {
		// Merging
		const labelWithValue = { type : labels[i], value: data[i]};
		// push
		results.push(labelWithValue);
	}
	// 
	return results;
}

function renderChart(index, data) {

	// // // Get the responses and display them
	// let ctx = document.querySelector(`#canvas${i}`).getContext("2d");

	// let data = {
	//     datasets: [{
	//         data: results_without_short_paragraph[i].result,
	//         backgroundColor: [
	//         "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
	//         "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
	//         "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
	//         "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
	//         "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
	//         "#00b894","#0984e3","#d63031","#f53b57","#ffa801",
	//         ]
	//     }],
	//     // These labels appear in the legend and in the tooltips when hovering different arcs
	//     labels: results_without_short_paragraph[i].options
	// };
	// // For a pie chart
	// let myPieChart = new Chart(ctx, {
	//     type: 'pie',
	//     data: data,
	//     options: {
	//         legend: { position: 'right', labels: {fontColor: 'rgba(0, 0, 0,.60)'}}
	//     }
	// });
	// const data = [
	//   { type: '分类一', value: 27 },
	//   { type: '分类二', value: 25 },
	//   { type: '分类三', value: 18 },
	//   { type: '分类四', value: 15 },
	//   { type: '分类五', value: 10 },
	//   { type: '其他', value: 5 },
	// ];

	// const piePlot = new Pie(`canvas${index}`, {
	//   appendPadding: 10,
	//   data,
	//   angleField: 'value',
	//   colorField: 'type',
	//   radius: 0.9,
	//   label: {
	//     type: 'inner',
	//     offset: '-30%',
	//     content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
	//     style: {
	//       fontSize: 14,
	//       textAlign: 'center',
	//     },
	//   },
	//   interactions: [{ type: 'element-active' }],
	// });

	// piePlot.render();

}
