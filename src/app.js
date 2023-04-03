const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const realMorgan = require('morgan')
// const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
// const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
require('./config/passport')(passport);

// app.use(session({
// secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }))

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, './public/build')));

// Handle GET requests to /api route

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});


if (config.env !== 'test') {
  app.use(morgan.successHandler);
}
app.use(realMorgan('dev'));

// set security HTTP headers
app.use(helmet());

// // parse json request body
app.use(express.json());

// // parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// // sanitize request data
app.use(xss());
app.use(mongoSanitize());

// // gzip compression
app.use(compression());

// // enable cors
app.use(cors());
app.options('*', cors());

// // jwt authentication
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.set('view engine', 'hbs');
// // limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));




// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
