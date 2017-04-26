var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cookieSession = require('cookie-session');
var sess;

var about = require('./routes/index');
var contact = require('./routes/index');
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var user = require('./routes/user');
var ucp = require('./routes/user/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name:'Admin',
    secret: "aVes84dvun4sdf3aeRF530",
    proxy: true,
    resave: true,
    saveUninitialized: true,
    maxAge: 60 * 10000
})
);
app.all('/login', login);
app.use('/', index);
app.use('/about', about);
app.use('/contact', contact);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/user', user);
app.use('/ucp', ucp);
// app.get('*', function(req, res, next){
//         var err = new Error('Not Found');
//         err.status = 404;
//         next(err);  
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: '404'});
});

module.exports = app;
require('./lib/ami.js');
