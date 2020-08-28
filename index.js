const express                         = require('express');
// const ejs                             = require('ejs'); 
const passport                        = require('passport'); 
const express_graphql                 = require('express-graphql');
const express_sessions                = require('express-session');
const body_parser                     = require('body-parser');
const helmet                          = require('helmet');
const xss                             = require('xss');
const dotenv                          = require('dotenv');
const morgan                          = require('morgan');
const redis                           = require('redis');
const RedisStore                      = require('connect-redis')(express_sessions);
const databaseConnection              = require('./Config/DatabaseConnection.js');
const strategies                      = require('./Passport/PassportAuthentication.js');
const authentication                  = require('./Routes/Authentication.js');
const questions                       = require('./Routes/Questions.js');
const responses                       = require('./Routes/Responses.js');
const pageRendering                   = require('./Routes/PageRenderingRoutes.js');

// Load .env
dotenv.config({ path: './Config/.env' });

// Init express && router
const app = express();

// Init View engine
app.set('view engine','ejs');

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

// Init Passport
app.use(passport.initialize()); strategies.googleStrategy();  strategies.githubStrategy();
strategies.linkedInStrategy();  strategies.serializeUser();   // strategies.deserializeUser();

// Init graphql

// Init static folder to serve
app.use(express.static('Public/dist'));

// Init body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const Question  = require('./Models/QuestionsModel.js')
app.get('/get', async(req,res)=>{
	res.json(req.session);
	// const survey = await Question.find({ _id: "5f47c5059af74c6b50918af4", user_id: "5f3043e1a02f0368dcc46125" })
	// res.json(survey)

})

// Routes
app.use('/auth',authentication);   app.use('/question',questions);
app.use('/response',responses);    app.use('/',pageRendering);

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

// location / {
//    root   html;
//    index  index.html index.htm;
// }
// INITiAL ROUTE
// app.get('/',(req,res)=>{
// 	res.render('pages/index');
// 	// redisDatabase.keys('*',  (err, keys)=>{
// 	// 	console.log(keys);
// 	// })
// 	redisDatabase.get('sess:mk8xcUI4epdpI80EYxz8g1ZkWDw09Pqm',  (err, value)=>{
// 		console.log(JSON.parse(value));
// 	})
// })