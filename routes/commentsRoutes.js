var express 		= require('express'),
	router			= express.Router(),
	campground		= require('../models/campground'),
	comment			= require('../models/comment'),
	middleware		= require('../middleware');
	
router.get('/campgrounds/:id/comments/new',middleware.isLoggedIn,function(req, res){
	campground.findById(req.params.id,function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			// console.log(req.user);
			// console.log(currentUser);
			res.render('comments/new',{campground:foundCampground});
		}
	})
	
});


router.post('/campgrounds/:id/comments',middleware.isLoggedIn,function(req, res){
	
	campground.findById(req.params.id,function(err, foundCampground){
		if(err){
			
			console.log(err);
		}
		else{
			
			comment.create(req.body.comment,function(err, newComment){
				if(err){
					console.log(err);
				}
				else{
					
					newComment.author.username=req.user.username;
					newComment.author.id=req.user._id;
					newComment.save();
					foundCampground.comments.push(newComment);
					foundCampground.save();
					res.redirect('/campgrounds/'+req.params.id);
					}
					
				});
			}
	});
});

router.get('/campgrounds/:id/comments/:comment_id/edit', middleware.checkCommentAuthor, function(req, res){
	comment.findById(req.params.comment_id,function(err, foundComment){
		if(err){
			console.log(err);
		}
		else{
			// res.send('haha');
			campground.findById(req.params.id,function(err, foundCampground){
				res.render('comments/edit',{campground:foundCampground,comment:foundComment});
			})
			
		}
	})
});


router.put('/campgrounds/:id/comments/:comment_id', middleware.checkCommentAuthor, function(req, res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err, updatedComment){
		if(err){
			console.log(err);
		}
		else{
			console.log(req.params.comment_id);
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
});

router.delete('/campgrounds/:id/comments/:comment_id', middleware.checkCommentAuthor, function(req, res){
	
	comment.findByIdAndRemove(req.params.comment_id,function(err, editCampground){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
});

module.exports=router;

