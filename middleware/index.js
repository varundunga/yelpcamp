var campground		= require('../models/campground'),
	comment			= require('../models/comment');

var middleware={};

middleware.isLoggedIn=function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
	   return next();
	}
	res.render('users/login');

	};	

middleware.checkCommentAuthor=function checkCommentAuthor(req, res, next){
	if(!req.isAuthenticated()){
		
		res.redirect('/campgrounds/'+req.params.id);
	}
	else{
				
		comment.findById(req.params.comment_id,function(err, foundComment){
			
			
		if(req.user && (req.user._id).equals(foundComment.author.id)){
			return next();
		}
		res.redirect('/campgrounds/'+req.params.id);
			});
	}
	
};

middleware.checkCampgroundOwner=function checkCampgroundOwner(req, res, next){
	if(!req.isAuthenticated()){
		
		res.redirect('/campgrounds/'+req.params.id);
	}
	else{
				
		campground.findById(req.params.id,function(err, foundCampground){
			
			
		if(req.user && (req.user._id).equals(foundCampground.author.id)){
			return next();
		}
		res.redirect('/campgrounds/'+req.params.id);
			});
	}
	
};

module.exports=middleware;