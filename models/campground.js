var mongoose		= require('mongoose'),
	campgroundSchema= new mongoose.Schema(
	{
	name		: String,
	image		: String,
	comments	: [
		{
			type	: mongoose.Schema.Types.ObjectId,
		 	ref		: 'comment'
		}
		],
	author: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref	:'user'
		},
		username:String
		
	}
}   
);
module.exports=mongoose.model('campground',campgroundSchema);