const { users } = require('../models/index');

const verifyUserBody = async (updateBody) => {
  if (updateBody.contact && (await users.isUsernameTaken(updateBody.username))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username is already in use!');
  }
  if (updateBody.email && (await users.isEmailTaken(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email address is already in use!');
  }
}

module.exports = { verifyUserBody }
