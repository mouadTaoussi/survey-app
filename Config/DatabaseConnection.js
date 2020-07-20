const mongoose                        = require('mongoose'); 
const redis                           = require('redis');

module.exports = {
	redisConnection: ()=>{
		try {
			console.log('[INFO]: Redis Database up and running!');
			return redis.createClient({
				port : process.env.REDIS_LABS_PORT,
				host : process.env.REDIS_LABS_HOST,
				password : process.env.REDIS_LABS_PASSWORD
			});
		}catch (err){
			console.log("[ERROR]: Database isn't and running!");
			throw new Error(err);
		}
	},
	mongodbConnection: ()=>{
		return mongoose.connect(process.env.DATABASE_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
			if(err){
				console.log("[ERROR]: Database isn't and running!");
				throw new Error(err);
			}else {
				console.log('[INFO]: Database up and running!');
			}
		})
	}
};