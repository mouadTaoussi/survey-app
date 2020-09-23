const express                               = require('express');
const APIControllers                        = require('.././Api/Api.js');
const { validateAPIKEY, isOwenedTheSurvey }  = require('.././Middlewares/Authentication.js');

// Init router
const router = express.Router();

// Surveys
router.get    ('/get/survey',      validateAPIKEY, APIControllers.getSurvey);
router.get    ('/get/surveys',     validateAPIKEY, APIControllers.getSurveys);
router.put    ('/update/survey',   validateAPIKEY, isOwenedTheSurvey, APIControllers.updateSurvey);
router.delete ('/delete/survey',   validateAPIKEY, isOwenedTheSurvey, APIControllers.deleteSurvey);

// Responses
router.get    ('/get/responses',   validateAPIKEY, isOwenedTheSurvey, APIControllers.getResponses);
// router.get    ('/get/response',    validateAPIKEY, APIControllers.getResponsesBySurveyID );

// Users
router.get    ('/get/user',        validateAPIKEY, APIControllers.getUserByID);
router.get    ('/get/users',       validateAPIKEY, APIControllers.getUsers);
router.put    ('/get/user',        validateAPIKEY, APIControllers.updateUser);


module.exports = router;