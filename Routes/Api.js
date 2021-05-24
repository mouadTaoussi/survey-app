const express                                = require('express');
const APIControllers                         = require('.././Api/Api.js');
const { validateAPIKEY, isOwenedTheSurvey_Api }  = require('.././Middlewares/Authentication.js');

// Init router
const router = express.Router();

// Surveys
router.get    ('/get/survey',      validateAPIKEY, APIControllers.getSurvey);
router.get    ('/get/surveys',     validateAPIKEY, APIControllers.getSurveys);
router.put    ('/update/survey',   validateAPIKEY, isOwenedTheSurvey_Api, APIControllers.updateUserSurvey);
router.delete ('/delete/survey',   validateAPIKEY, isOwenedTheSurvey_Api, APIControllers.deleteSurvey);

// Responses
router.get    ('/get/responses',   validateAPIKEY, isOwenedTheSurvey_Api, APIControllers.getResponses);

// Users
router.get    ('/get/user',        validateAPIKEY, APIControllers.getUserByID);
router.get    ('/get/users',       validateAPIKEY, APIControllers.getUsers);


module.exports = router;