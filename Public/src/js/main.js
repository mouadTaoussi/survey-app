import axios     from 'axios';
import Sortable  from 'sortablejs';
// import jquery from 'jquery';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '.././css/style.css';
import './vendors/fontawesome/css/all.css';
import './Authentication.js';
import './DomManupilation.js';
import './Questions.js';
import './Responses.js';

// Grab Questions list
const questions_list = document.querySelector('.questions_list');

// Init sortable js
const sortable = new Sortable(questions_list,{
	handle: ".dragable",
	animation: 550,
})