let chai 		= require('chai'),
	chaiHttp 	= require('chai-http');
var should		= chai.should();
chai.use(chaiHttp);
var url='https://webdev-twrgn.run.goorm.io';
// let server		= require('')

describe('campgrounds', () => {
	 describe('/GET landing page', () => {
	 
     it('it should GET landing page', (done) => {
     chai.request(url)
       .get('/')
       .end((err, res) => {
             (res).should.have.status(200);
             // (res.body).should.be.a('object);
             // (res.body.podcasts.length).should.be.eql(1);
             done();
          });
       });
  });
 describe('/GET campgrounds', () => {
	 
     it('it should GET all the campgrounds', (done) => {
     chai.request(url)
       .get('/campgrounds')
       .end((err, res) => {
             (res).should.have.status(200);
             // (res.body).should.be.a('object);
             // (res.body.podcasts.length).should.be.eql(1);
             done();
          });
       });
  });
	 describe('/GET login page', () => {
	 
     it('it should GET login page', (done) => {
     chai.request(url)
       .get('/users/login')
       .end((err, res) => {
             (res).should.have.status(200);
             // (res.body).should.be.a('object);
             // (res.body.podcasts.length).should.be.eql(1);
             done();
          });
       });
  });
	 describe('/GET register', () => {
	 
     it('it should GET register new user page', (done) => {
     chai.request(url)
       .get('/users/new')
       .end((err, res) => {
             (res).should.have.status(200);
             // (res.body).should.be.a('object);
             // (res.body.podcasts.length).should.be.eql(1);
             done();
          });
       });
  });
});