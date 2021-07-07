const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
let flash = require('express-flash')

//page paths
const indexRouter = require('./routes/Controller/defaultController');
const userRouter = require('./routes/Controller/userController');
const videoRouter = require('./routes/Controller/videoController');
const playlistRouter = require('./routes/Controller/playlistController');
const listedVideoRouter = require('./routes/Controller/listedVideoController');
const reactionRouter = require('./routes/Controller/reactionController');
const commentRouter = require('./routes/Controller/commentController');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash())

//cookie setup
app.set('trust proxy', 1) // trust first proxy
app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 1000,
    cookie: {
        httpOnly: true,
        secure: true
    }
}));



app.use(express.static(__dirname + "/"))
app.use(express.static("/public"))
    // app.use('/uploads', serveIndex(__dirname + '/uploads'));
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// general settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });
  
//pages to url
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);
app.use('/reaction', reactionRouter);
app.use('/playlist', playlistRouter);
app.use('/listedVideo', listedVideoRouter);
app.use('/comment', commentRouter);

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

module.exports = app;