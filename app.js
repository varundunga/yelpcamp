var express 		= require('express'),
	app 			= express(),
 	bodyParser		= require('body-parser'),
 	methodOverride	= require('method-override'),
	mongoose		= require('mongoose'),
	passport		= require('passport'),
	passportLocal	= require('passport-local'),
	flash			= require('connect-flash'),
	// campground		= require('./models/campground'),
	// comment			= require('./models/comment'),
	user			= require('./models/user'),
	seedDB			= require('./seed');

var campgroundsRoutes	= require('./routes/campgroundsRoutes'),
	commentsRoutes		= require('./routes/commentsRoutes'),
	usersRoutes			= require('./routes/usersRoutes');

//mongoose config
mongoose.connect('mongodb+srv://varun:yelpcamp123@cluster0-pp3ro.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true}).then(()=>{console.log('db connected')}).catch(err=>{console.log(err)});
mongoose.set('useFindAndModify', false);
// seedDB();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());

//passport configuration
app.use(require('express-session')({
	secret:'im varun',
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
	res.locals.currentUser=req.user;
	res.locals.error=req.flash('error');
	res.locals.success=req.flash('success');
	next();
});

app.use(campgroundsRoutes);
app.use(commentsRoutes);
app.use(usersRoutes);


// var campgroundsj=JSON.parse(campgrounds);

app.listen(process.env.PORT || 3000,()=>{
	console.log('Server Started');	
});