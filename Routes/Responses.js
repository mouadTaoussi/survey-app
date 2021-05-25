const express                         = require('express');
const puppeteer                       = require('puppeteer');
const fileSystem                      = require('fs');
const mime                            = require('mime');
const path                            = require('path');
const uuid                            = require('uuid');
const Responses                       = require('.././Controllers/Responses.js');
const Questions                       = require('.././Controllers/Questions.js');//
const auth                            = require('.././Middlewares/Authentication.js');
const validators                      = require('.././Middlewares/Validators.js');
const databaseConnection              = require('.././Config/DatabaseConnection.js');

// Website domain used to work with puppeteer
// const WEBSITE_DOMAIN = "http://localhost:5000";
const WEBSITE_DOMAIN = "https://surveyapp1.herokuapp.com";

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

router.get('/processSurveyResponses',validators.checkLanguage, auth.isAuthenticated , auth.isOwenedTheSurvey_Api ,async(request,response)=>{
	// Authenticated user
	const user = request.user;
	// Get the queries
	const { survey_id } = request.query;

	// Get the survey
	const questions = await questionsController.findSurvey( user.id, survey_id );

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
router.get('/downloadResults/json', validators.checkLanguage, auth.isAuthenticated, auth.isOwenedTheSurvey_Api, async(request,response)=>{
	// Authenticated user
	const user = request.user;
	// Get the queries
	const { survey_id } = request.query;
	
	// Get the survey
	const questions = await questionsController.findSurvey( user.id, survey_id );

    // Get thier responses
	const responses = await responsesController.findResponses( survey_id );
	
	// Get the results of the survey
	const processing  = await questionsController.processSurveyResponses( 
		questions.data, responses.data
	);

	// Checking ...
	if( responses.found && questions.found && processing.processed ) {

		// Get file location
		var fileLocation = __dirname + '/SurveyResultsForDownload/' + survey_id + '.txt';

		// Save results as a file
		fileSystem.appendFileSync(
			fileLocation, JSON.stringify(processing.data.questions)
		)

		// const filename = path.basename(file);
		const mimetype = mime.lookup(fileLocation);

		response.setHeader('Content-disposition', 'attachment; filename=' + survey_id);
		response.setHeader('Content-type', mimetype);

		// // Download the file
		response.download(fileLocation,"survey_report_"+survey_id+".txt");

		setTimeout(()=>{
			// Delete  file
			fileSystem.unlink(fileLocation, function(err) {

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
router.get('/downloadResults/pdf', validators.checkLanguage, auth.isAuthenticated, auth.isOwenedTheSurvey_Api, async(request,response)=>{
	// Get the queries
	const { survey_id } = request.query;

	// Init new browser
	const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
	const page = await browser.newPage();

	// Create cookies
	const cookies = [
		{
		    "domain": "localhost",
		    "hostOnly": true,
		    "httpOnly": true,
		    "name": request.headers.cookie.slice(0,11),
		    "path": "/",
		    "sameSite": "unspecified",
		    "secure": false,
		    "session": true,
		    "storeId": "0",
		    "value": request.headers.cookie.slice(12),
		    "id": 1
		}
	]
	const prodCookies = [
		{
		    "domain": "surveyapp1.herokuapp.com",
		    "hostOnly": true,
		    "httpOnly": true,
		    "name": request.headers.cookie.slice(0,11),
		    "path": "/",
		    "sameSite": "unspecified",
		    "secure": false,
		    "session": true,
		    "storeId": "0",
		    "value": request.headers.cookie.slice(12),
		    "id": 1
		}
	]
	// Set cookie
	await page.setCookie(...prodCookies);
	
	// Seceenshot and save it
	await page.goto(`${WEBSITE_DOMAIN}/results?survey_id=${survey_id}`);

	// await page.screenshot({ path: 'paypal_login2.png' });
	// page.pdf() is currently supported only in headless mode.
	// @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
	// await page.waitForNavigation({
	// 	waitUntil: 'networkidle0',
	// })
	await page.waitForSelector('#canvas0', {
	  visible: true,
	});
   
	// Get file location
	var fileLocation = __dirname + '/SurveyResultsForDownload/' + uuid.v4() + '.pdf';

	// Take a screenshot of the report and save it in the right location
	await page.pdf({
		path : fileLocation,
		format: 'letter',
		// printBackground: true,
    	// format: 'A4'
	});

	// Close the browser
	await browser.close();
	//////////;

	// Download 

	// const filename = path.basename(file);
	const mimetype = mime.lookup(fileLocation);

	response.setHeader('Content-disposition', 'attachment; filename=' + survey_id);
	response.setHeader('Content-type', mimetype);

	// // Download the file
	response.download(fileLocation,"survey_report_"+survey_id+".pdf");

	// Remove 
	setTimeout(()=>{
		// Delete  file
		fileSystem.unlink(fileLocation, function(err) {

			if (err) { return console.error(err); }

		});
	},5000)
	// End
})



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


// Trying using the puppteer for the first time! (This code is temporary)
// const cookie = { 
// 	name: request.headers.cookie.slice(0,11) , 
// 	value: request.headers.cookie.slice(12),
// 	domain: 'https://http://surveyapp1.herokuapp.com' ,
// 	// expires : 11110,
// 	// session : false
// 	// Or
// 	// expires : undefined,
// 	// session : true
// 	// See: https://github.com/puppeteer/puppeteer/issues/1350
// };