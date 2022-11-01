const httpStatus = require("http-status");
const { userService, sessionService } = require("./index");
const { userSessions } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise}
 */
const loginUsernameAndPassword = async (email, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordCorrect = await user.checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
  }

  return user;
};

/**
 * Logout with refreshToken
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const session = await userSessions.findOne({ where: { token: refreshToken }});
  if (!session) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cannot find session for logout');
  }
  await session.destroy();
}

/**
 * Refresh access token with refreshToken
 * @param {string} refreshToken
 * @returns {Promise}
 */
const refreshToken = async (refreshToken) => {
  try {
    const session = await sessionService.verifyRefreshTokenSQL(refreshToken);
    const user = await userService.getUserById(userSessions.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cannot find the user associated with this token');
    }
    await session.destroy();
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid session. Please login again');
  }
}

module.exports = {
  loginUsernameAndPassword,
  logout,
  refreshToken
}
