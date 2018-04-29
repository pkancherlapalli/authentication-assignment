var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//routers
var index = require('./routes/index');
var register = require('./routes/register');
var buy = require('./routes/buy');
var sell = require('./routes/sell');
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser('cscie31-secret'));
app.use(session({
  secret:"cscie31",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(passport.initialize());
app.use(passport.session());

//passport config
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//require('./config/passport')(passport);

//mongoose connection to mongodb atlas
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-fplwu.mongodb.net:27017,cluster0-shard-00-01-fplwu.mongodb.net:27017,cluster0-shard-00-02-fplwu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
var db = mongoose.connection;
db.on('error', (err)=>{ console.error(`connection error:${err}`); });
console.log("connected!");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static',express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/buy', buy);
app.use('/sell', sell);
//app.use('/api', api);


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
  res.render('error');
});

module.exports = app;
