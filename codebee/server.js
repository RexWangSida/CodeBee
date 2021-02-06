var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');


const DB = "mongodb+srv://Sida:108740@cluster0.5fddy.mongodb.net/codebee?retryWrites=true&w=majority";

var app = express();

mongoose.connect(
  DB,
  {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true},
  (err)=>{
    if(err) throw err;
    console.log("Successfully connected to the DB...");


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'build')));

    app.use('/', indexRouter);
    app.use('/createuser', usersRouter);
    app.use('/login', loginRouter);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
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

  }
)


module.exports = app;
