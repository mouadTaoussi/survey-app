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
/////////////////////////////////////// GRAB CONFIG STUFF
const databaseConnection              = require('./Config/DatabaseConnection.js');
const firebaseInitialized             = require('./Config/FirebaseConfig.js');
/////////////////////////////////////// GRAB AUTH STRATEGIES 
const strategies                      = require('./Passport/PassportAuthentication.js');
/////////////////////////////////////// GRAB MODELS
/////////////////////////////////////// GRAB CONTROLLERS
/////////////////////////////////////// GRAB MIDDLEWARES
/////////////////////////////////////// GRAB ROUTES
const authentication                 = require('./Routes/Authentication.js');
const questions                 = require('./Routes/Questions.js');
const responses                 = require('./Routes/Responses.js');


// Load .env
dotenv.config({ path: './Config/.env' });

// Init express && router
const app = express();
// const router = express.Router();
// app.use(router);

// Init View engine
app.set('view engine','ejs');

// Init firebase
const firebaseDatabase = firebaseInitialized.firebaseConnection();

// Init database connection
const mongoDatabase = databaseConnection.mongodbConnection();

// Init redis connection
const redisDatabase = databaseConnection.redisConnection();

// Init sessions
app.use(express_sessions({
	secret : process.env.EXPRESS_SESSION_KEY,
	resave : false,
	saveUninitialized : true,
	store: new RedisStore({ host: process.env.REDIS_LABS_HOST, port: process.env.REDIS_LABS_PORT, client: redisDatabase }),
}))

// const cs = require('cookie-session');
// app.use(cs({
// 	keys : ["dfblndfblndfljb","sdvsdvsdvvsd"],
// 	name : "session",
// 	signed : true,
// 	httpOnly : true,
// }))

// Init Passport
app.use(passport.initialize());
strategies.googleStrategy();
strategies.githubStrategy();
strategies.linkedInStrategy();
strategies.serializeUser();
// strategies.deserializeUser();
// Init graphql


// Init static folder to serve
app.use(express.static('Public'));

// Init body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Routes
// app.use('/');
app.use('/auth',authentication);
app.use('/question',questions);
app.use('/response',responses);

// INITiAL ROUTE
app.get('/',(req,res)=>{
	res.render('pages/index');
	// redisDatabase.keys('*',  (err, keys)=>{
	// 	console.log(keys);
	// })
	redisDatabase.get('sess:mk8xcUI4epdpI80EYxz8g1ZkWDw09Pqm',  (err, value)=>{
		console.log(JSON.parse(value));
	})
	
})
app.get('/get',(req,res)=>{
	console.log(req.session);
	res.json(req.session);
})
app.get('/set',(req,res)=>{
	const local = {
		user : 225
	}
	req.session.userid=null;
	req.session.user = local;
	res.json(req.session)
})
// Init helmet
app.use(helmet());

// Init xss
app.use(xss);

// Init logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


// Init port && Start the server
const PORT = process.env.PORT || process.env.NODE_PORT;
app.listen(PORT,()=>{
	console.log("[INFO]: Server up and running!")
});