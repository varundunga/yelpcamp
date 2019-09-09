var mongoose		= require('mongoose'),
	passportMongoose= require('passport-local-mongoose'),
	userSchema		= new mongoose.Schema(
	{
	username	: String,
	password	: String,
	}   
);
userSchema.plugin(passportMongoose)
module.exports=mongoose.model('user',userSchema);