var express 		= require('express'),
	router			= express.Router(),
	passport		= require('passport'),
	user			= require('../models/user')
	

router.get('/',function (req,res){
	res.render('landing',{currentUser:req.user});
});

router.get('/users/new',function(req, res){
	
		res.render('users/new');
	
});

router.post('/users/new',function(req, res){
	var newUserName= new user({username:req.body.username});
	user.register(newUserName,req.body.password,function(err, newUser){
		if(err){
			console.log(err);
			req.flash('error',err.message);
			res.render("users/new");
			
			
		}
		else{
			passport.authenticate('local')(req,res,function(){
				res.redirect('/campgrounds');
			});
			
		}
	});
	
});

router.get('/users/login',function(req, res){
	
		res.render('users/login');
	
});


router.post('/users/login',
  passport.authenticate('local', { successRedirect: '/campgrounds',
                                   failureRedirect: '/users/login',
                                   failureFlash: true })
);
	


router.get('/users/logout',function(req,res){
	req.logout();
	req.flash('success','successfully logged out');
	res.redirect('/campgrounds');
	
});

module.exports=router;
