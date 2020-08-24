// @flow
const { app } = require('electron');
const { resolve } = require('path');

/**
 * Applications Configuration
 **/

module.exports = {
  APP_NAME: 'SurveyApp',
  APP_VERSION: app.getVersion(),
  APP_REMOTE_URL: '/login',
  APP_DEV_URL: 'http://localhost:5000/login',
  APP_REMOTE_HOME_URL: '/',
  APP_DEV_HOME_URL: 'http://localhost:5000',

  GITHUB_URL: 'https://github.com/mouadTaoussi/survey-app',
  GITHUB_URL_LICENSE:'',
  GITHUB_URL_ISSUES: 'https://github.com/mouadTaoussi/survey-app/issues',

  WINDOW_DEFAULT_HEIGHT: 700,
  WINDOW_DEFAULT_WIDTH: 1300,
  WINDOW_MIN_HEIGHT: 420,
  WINDOW_MIN_WIDTH: 720,
  WINDOW_BG_COLOR: '#FAFAFA',

  ICON: resolve(__dirname, './resources/icons/logo.png'),
};
