const express                         = require('express');
const { validateAPIKEY }              = require('.././Middlewares/Authentication.js');

// Init router
const router = express.Router();

// Surveys
router.get    ('/get/survey',         validateAPIKEY, getSurvey              )
router.get    ('/get/surveys',        validateAPIKEY, getSurveys             )
router.put    ('/update/survey',      validateAPIKEY, updateSurvey           )
router.delete ('/delete/survey',      validateAPIKEY, deleteSurvey           )

// Responses
router.get    ('/get/responses',      validateAPIKEY, getResponse            )
router.get    ('/get/responses',      validateAPIKEY, getResponsesBySurveyID )

// Users
router.get    ('/get/user',           validateAPIKEY, getUserByID            )
router.get    ('/get/users',          validateAPIKEY, getUsers               )
router.put    ('/get/user',           validateAPIKEY, updateUser             )


module.exports = router;