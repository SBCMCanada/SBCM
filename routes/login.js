//Session/login management

var express = require('express');
var auth = require('../utils/auth');
var session = require('express-session');

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var router = express.Router();

var models = require('../models');
User = models.User;

/* GET login page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login' });
});

/* GET register page. */
router.get('/new', function(req, res) {
  res.render('register', { title: 'Create New Account' });
});

router.post('/new', function(req, res) {
  var user = new User(req.body);

    // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        console.log('Error while generating salt: ' +err);
      }

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err){
            console.log("Error while salting: " +err);
          }

          // override the cleartext password with the hashed one
          user.password = hash;
          user.save();
      });
  });

  res.redirect('/');
});

/* Logout (finish session). */
router.get('/finish', function(req, res) {
    var session = req.session;
    if (session){
      session.loggedIn = false;
    }
  res.redirect('/');
});

/* GET login page. */
router.get('/checkSession', function(req, res) {
  var session = req.session;
  var result = {loggedIn:false};
  if (session != null){
    result = {loggedIn:req.session.loggedIn}
  }
  res.json(result);
});

/* GET login page. */
router.post('/', function(req, res) {
  var body = req.body;
  console.log('Login body: %j',body);

  var candidatePassword = body.password;

  User.getUserByUsername(body.username, function(err, result){

    console.log('found user: %j',result);

    var hashedPass = result.password;

    bcrypt.compare(candidatePassword, hashedPass, function(err, isMatch) {
      if (err) return cb(err);

      if (isMatch===true){
        console.log('success login');
        req.session.loggedIn=true;
        req.session.username = body.username;
      }else{
        console.log('error login - wrong password');
      }

      res.redirect('/');
    });

  });
  /*
  //TODO: get user from db and compare passwrods
  if (req.body.password === user.password) {
     res.redirect('/dashboard');
   } else {
     res.render('login.jade', { error: 'Invalid email or password.' });
   }
     */
});

module.exports = router;
