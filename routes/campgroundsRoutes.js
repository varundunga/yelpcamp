var express 		= require('express'),
	router			= express.Router(),
	campground		= require('../models/campground'),
	comment			= require('../models/comment'),
	middleware		= require('../middleware');


router.get('/campgrounds',function(req, res){
	
	campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render('campgrounds/index',{campgrounds:campgrounds,currentUser:req.user});
		}
		
	});
});

router.post('/campgrounds',middleware.isLoggedIn,function(req, res){
	
	
	campground.create(req.body.campground,function (err, newcampground){
		if(err){
			console.log(err);
		}
		else{
			campground.find({},function(err,campgrounds){
				if(err){
					console.log(err);
					
				}
				else{
					newcampground.author.username=req.user.username;
					newcampground.author.id=req.user._id;
					newcampground.save();
					req.flash('success','campground added successfully');
					res.render('campgrounds/index',{campgrounds:campgrounds})
				}
			})
			
		}
		
	})
});

router.get('/campgrounds/new',middleware.isLoggedIn,function(req, res){
	
	
	res.render('campgrounds/new',{currentUser:req.user});
});


router.get('/campgrounds/:id',function(req, res){
	
	
	campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground){
		if(err){
			console.log(err);
			
		}
		else{
			foundCampground.comments.forEach(icomment=>{
				//console.log(icomment);
				comment.findById(icomment,a=>
											   {
					// console.log(a);
					
				});
			});
			
			
			//console.log(foundCampground);
			res.render('campgrounds/show',{campground:foundCampground,currentUser:req.user});
		}
	})	
	
});


router.put('/campgrounds/:id', middleware.checkCampgroundOwner, function(req, res){
	campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, editCampground){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	})
});

router.delete('/campgrounds/:id', middleware.checkCampgroundOwner, function(req, res){
	
	campground.findByIdAndRemove(req.params.id,function(err, editCampground){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/campgrounds');
		}
	})
});


router.get('/campgrounds/:id/edit',middleware.checkCampgroundOwner,function(req, res){
	
	campground.findById(req.params.id,function (err, foundCampground){
		if(err){
			console.log(err);
			
		}
		else{
			
			
			res.render('campgrounds/edit',{campground:foundCampground,currentUser:req.user});
		}
	})	
	
});

module.exports=router;
