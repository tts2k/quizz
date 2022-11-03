const httpStatus = require('http-status');
const { users } = require('../models/index');
const ApiError = require('./ApiError');

const verifyUserBody = async (updateBody) => {
  if (updateBody.username && (await users.isUsernameTaken(updateBody.username))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username is already in use!');
  }
  if (updateBody.email && (await users.isEmailTaken(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email address is already in use!');
  }
}

module.exports = { verifyUserBody }
