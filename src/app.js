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
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(session({
secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, './public/build')));

// Handle GET requests to /api route

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

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
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// // limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use('/', require('./route/pages'));

// // v1 api routes
app.use('/v1', routes);



// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
