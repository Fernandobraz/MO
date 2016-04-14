var express 		= require('express');
var app 			= express();
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var mongoose 		= require('mongoose');
var passport 		= require('passport');
var flash    		= require('connect-flash');
var session  		= require('express-session');
var http            = require('http').Server(app);
// var io              = require("socket.io")(http);
var npid            = require("npid");
var uuid            = require('node-uuid');

var config 			= require('./config');

var routes 			= require('./routes/index');
var cards           = require('./routes/cards');
var game            = require('./routes/game');
var port 			= process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
require('./config/passport')(passport); // pass passport for configuration
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var users = require('./routes/users')(app, passport);
app.use('/', routes);
app.use('/cards', cards);
game(app, http);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('The page you are looking for does not exist... Check if the URL is correct.');
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

http.listen(3000, function(){
	console.log('listening on *:3000');
});


module.exports = app;
