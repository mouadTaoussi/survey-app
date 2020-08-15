import axios     from 'axios';
import Chart     from 'chart.js';

// Submit response
// Get the responses and display them
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