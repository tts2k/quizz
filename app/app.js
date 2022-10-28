const express = require('express');
const morgan = require('morgan');
const http = require('http');
const httpStatus = require('http-status');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const ApiError = require('../utils/ApiError');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

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

// send back a 404 error for any unknow api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = server;
