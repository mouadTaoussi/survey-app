const express                         = require('express');
const puppeteer                       = require('puppeteer');
const fileSystem                      = require('fs');
const mime                            = require('mime');
const path                            = require('path');
const Responses                       = require('.././Controllers/Responses.js');
const Questions                       = require('.././Controllers/Questions.js');//
// const auth                            = require('.././Middlewares/Authentication.js');
// const validators                      = require('.././Middlewares/Validators.js');
const databaseConnection              = require('.././Config/DatabaseConnection.js');
const { isOwenedTheSurvey }           = require('.././Middlewares/Authentication.js');

// Init appropriate controller
const responsesController = new Responses();
const questionsController = new Questions();

// Init router
const router = express.Router();

router.post('/submitResponse', async (request,response)=>{
	// Use the appropriate controller
	// Logic
	response.json(await responsesController.submitResponses(request.body));
})

router.get('/processSurveyResponses', async(request,response)=>{

	// Get the queries
	const {  user_id, survey_id } = request.query;

	// Trying using the puppteer for the first time! (This code is temporary)
	const cookie = { 
		name: request.headers.cookie.slice(0,11) , 
		value: request.headers.cookie.slice(12),
		domain: 'https://http://surveyapp1.herokuapp.com' 
	};

	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	// Set cookie
	 // const client = await page.target().createCDPSession();

	// await client.send('Network.enable');
    // const setCookie = await client.send('Network.setCookie', cookie);
	await page.setCookie(cookie)
	// UnhandledPromiseRejectionWarning: Error: Protocol error (Network.deleteCookies): At least one of the url and domain needs to be specified   
	await page.goto(`http://localhost:5000/surveyEditor?survey_id=${survey_id}&user_id=${user_id}`)
	await page.screenshot({ path: 'paypal_login2.png' })
	await browser.close()
	console.log(cookie)
	console.log(request.session.cookie)
	//////////

	// Get the survey
	const questions = await questionsController.findSurvey( user_id, survey_id );

    // Get thier responses
	const responses = await responsesController.findResponses( survey_id );
	
	// Get the results of the survey
	const processing  = await questionsController.processSurveyResponses( 
		questions.data, responses.data
	);

	// Checking ...
	if( responses.found && questions.found && processing.processed ) {

		response.send({
			processed : processing.processed,
			responsesNumber : responses.data.length,
			data :  processing.data 
		})		
	}else {
		response.send({
			processed : false,
			message :  "Something went wrong! Try again."
		})		
	}

})


// Download results JSON
router.get('/downloadResults',async(request,response)=>{
	// Get the queries
	const {  user_id, survey_id } = request.query;
	
	// Get the survey
	const questions = await questionsController.findSurvey( user_id, survey_id );

    // Get thier responses
	const responses = await responsesController.findResponses( survey_id );
	
	// Get the results of the survey
	const processing  = await questionsController.processSurveyResponses( 
		questions.data, responses.data
	);

	// Checking ...
	if( responses.found && questions.found && processing.processed ) {

		// Save results as a file
		fileSystem.appendFileSync(
			__dirname + '/SurveyResultsForDownload/' + survey_id + '.txt',
			JSON.stringify(processing.data.questions)
		)

		// Get the file location
		var file = __dirname + '/SurveyResultsForDownload/' + survey_id + '.txt';

		// const filename = path.basename(file);
		const mimetype = mime.lookup(file);

		response.setHeader('Content-disposition', 'attachment; filename=' + survey_id);
		response.setHeader('Content-type', mimetype);

		// // Download the file
		response.download(file,"your_survey_result_"+survey_id+".txt");

		setTimeout(()=>{
			// Delete  file
			fileSystem.unlink(file, function(err) {

				if (err) { return console.error(err); }

			});
		},5000)
		
	}else {
		response.send({
			processed : false, message :  "Something went wrong! Try again."
		})		
	}
})


// @TODO: Download results CSV
// @TODO: Download results PDF



module.exports = router;
// Save results as a file
// const writeStream = fileSystem
//  .createWriteStream(__dirname  + '/SurveyResultsForDownload/' + survey_id + '.txt');

// // Write a new file for the results
// writeStream.write(JSON.stringify(processing.data.questions));
		
// fileSystem.readFile(__dirname + '/SurveyResultsForDownload/' + survey_id + '.txt','utf8',(err,data)=>{
// 	console.log(data)
// });

// // Ending the process
// writeStream.end();