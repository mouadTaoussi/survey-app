const express                         = require('express');
const graphql                         = require('graphql'); //
const ejs                             = require('ejs'); 
const firebase                        = require('firebase-admin');
const jsonwebtoken                    = require('jsonwebtoken'); //
const mongoose                        = require('mongoose'); 
const passport                        = require('passport'); 
const express_graphql                 = require('express-graphql');
const express_sessions                = require('express-session');
const body_parser                     = require('body-parser');
const helmet                          = require('helmet');
const xss                             = require('xss');
const dotenv                          = require('dotenv');
const morgan                          = require('morgan');
const passport_linkedin               = require('passport-linkedin'); // 
const passport_google_oauth20         = require('passport-google-oauth20'); //
const redis                           = require('redis');
const RedisStore                      = require('connect-redis')(express_sessions);
////////////////////////////////////// GRAB CONFIG STUFF
const databaseConnection              = require('./Config/DatabaseConnection.js');
const firebaseInitialized             = require('./Config/FirebaseConfig.js');
////////////////////////////////////// GRAB MODELS
////////////////////////////////////// GRAB CONTROLLERS
////////////////////////////////////// GRAB MIDDLEWARES


// Load .env
dotenv.config({ path: './Config/.env' });

// Init express && router
const app = express();
const router = express.Router();
app.use(router);

// Init View engine
app.set('view engine','ejs');

// Init firebase
const firebaseDatabase = firebaseInitialized.firebaseConnection();

// Init database connection
const mongoDatabase = databaseConnection.mongodbConnection();

// Init redis connection
const redisDatabase = databaseConnection.redisConnection();

// Init Passport
app.use(passport.initialize());
// Init graphql

// Init sessions
app.use(express_sessions({
	secret : process.env.EXPRESS_SESSION_KEY,
	// name : "session",
	// signed : true,
	// httpOnly : true,
	resave : false,
	saveUninitialized : false,
	store: new RedisStore({ host: process.env.REDIS_LABS_HOST, port: process.env.REDIS_LABS_PORT, client: redisDatabase })
}))

// Init static folder to serve
app.use(express.static('Public'));

// Init body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Init helmet
app.use(helmet());

// Init xss
app.use(xss);

// Init logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// INITiAL ROUTE
router.get('/',(req,res)=>{
	res.render('pages/index');
})
// Init port && Start the server
const PORT = process.env.PORT || process.env.NODE_PORT;
app.listen(PORT,()=>{
	console.log("[INFO]: Server up and running!")
});