var mongoose = require('mongoose'),
	campground = require('./models/campground'),
	comment = require('./models/comment');

var cmnt={author:'varun',comment:'abc'};

var data = [
	{
		name: 'Red Trail Campground',
		image:
			'https://images.goodsam.com/trailerlifedirectory/largefeatured/1000x/pho_722009624_01.jpg'
	},
	{
		name: 'Medora City Campground',
		image:
			'https://thedyrt.imgix.net/photo/99611/media/north-dakota-medora-campground_7f283fe2bd5006392ed5c53d66b516af.jpeg?dpr=2.63&fit=crop&h=270&w=270&crop=entropy&ixlib=ember-1.0.16'
	},
	{
		name: 'Blackwoods Campground',
		image:
			'https://lh5.googleusercontent.com/p/AF1QipOp77YFOijoFLKryWQq4zWtKbFG83aIOUhJnKBZ=w284-h160-k-no'
	}
];

function seedDB() {
	campground.deleteMany({}, function(err) {
		if (err) {
			console.log(err);}
			else {
			// data.forEach(function(seed) {
			// 	campground.create(seed, function(err, newcampground) {
			// 		if (err) {
			// 			console.log(err);}
			// 		 else {
					 comment.deleteMany({}, function(err) {
					 if (err) {
					 console.log(err)}});
			// 		 } else {
			// 		 comment.create(
			// 		 cmnt,
			// 		 function(err, cmnt) {
			// 		 if (err) {
			// 		 console.log(err);
			// 		 } else {
			// 		 newcampground.comments.push(cmnt);
			// 		 newcampground.save();
			// 		 console.log('new comment');
			// 		 }
			// 		 }
			// 		 );
			// 		 }
			// 		 });
			// 		 }
			// 			});
				// 	}
				// )
			}
		});
			};

module.exports = seedDB;