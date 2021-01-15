const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressValidator =  require ('express-validator');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const searchRouter = require('./routes/search');
const followingsRouter = require('./routes/followings');
const profileRouter = require('./routes/profile');
const dashboardRouter = require('./routes/dashboard');

const app = express();

app. use(function(req, res, next) {
  res. header("Access-Control-Allow-Origin", "*");
  res. header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect (process.env.MONGO_URI);
// mongoose.connect ('mongodb://localhost:27017/pixelapp');
// mongoose.connect ('mongodb://172.20.0.2:27017/pixelapp');

const db = mongoose.connection;
db.on('error', console.error.bind (console, 'connection error:'));
//comments
//use sessions for tracking logins
app.use(session({
  secret: 'projectApp',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
// app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());
app.use('/', indexRouter);
app.use('/', postRouter);
app.use('/', searchRouter);
app.use('/followings', followingsRouter);
app.use('/profile', profileRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = { app, db };
