var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = 5000;

var steamgamesRouter = require('./routes/steamgames');
var devnameRouter = require('./routes/devname');
var pubnameRouter = require('./routes/pubname');
var devlocationRouter = require('./routes/devlocation');
var publocationRouter = require('./routes/publocation');
var releasedateRouter = require('./routes/releasedate');
var categoryRouter = require('./routes/category');

var app = express();
app.listen(port, () => console.log(`Listening on port ${port}`))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', steamgamesRouter);
app.use('/devname', devnameRouter);
app.use('/pubname', pubnameRouter);
app.use('/devlocation', devlocationRouter);
app.use('/publocation', publocationRouter);
app.use('/releasedate', releasedateRouter);
app.use('/category', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
