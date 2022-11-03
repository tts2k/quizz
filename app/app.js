const express = require('express');
const http = require('http');
const httpStatus = require('http-status');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const ApiError = require('../utils/ApiError');
const cors = require('cors');
const passport = require('passport');
const config = require('../config/config');
const { jwtStrategy } = require('../config/passport');
const routes = require('../routes');
const morgan = require('../config/morgan');
const { errorConverter, errorHandler } = require('../validations/error');

const app = express();
const server = http.createServer(app);

console.log('morgan.successHandler:', morgan.successHandler)
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json requrest body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true}))

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// api route
app.use("/api/v1", routes);

// send back a 404 error for any unknow api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = server;
