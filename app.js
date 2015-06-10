//Requires
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var session = require('express-session');

//Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var documents = require('./routes/documents');
var dataRoute = require('./routes/data');

var login = require('./routes/login');

//Models
var models = require('./models');

//Init express app
var app = express();

console.log("starting app");

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(multer({dest: './uploads/',
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
}
}));

//Connect to DB
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function (callback) {
  //success
});

mongoose.connect('mongodb://127.0.0.1:27017/sbcm1');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(session({
  secret: 'sbcm-secr3t',
  resave: false,
  saveUninitialized: false
}));

var logger = function(req, res, next) {
    console.log("GOT REQUEST !");
    next(); // Passing the request to the next handler in the stack.
}

app.use(logger);

app.use(function(req,res,next){
  console.log('request - setting mongoose');
  req.mongoose = mongoose;
  next();
});

//Navigation routes
app.use('/', routes);
app.use('/login', login);

//REST routes
app.use('/rest/users', users);
app.use('/rest/documents', documents);
app.use('/rest/data', dataRoute);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
