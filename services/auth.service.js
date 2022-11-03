const httpStatus = require("http-status");
const userService = require('./user.service');
const sessionService = require('./session.service');
const { userSessions } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise}
 */
const loginUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordCorrect = await user.checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password');
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email
  };
};

/**
 * Logout with refreshToken
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const session = await userSessions.findOne({ where: { refreshToken: refreshToken }});
  if (!session) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cannot find session to logout');
  }
  await session.destroy();
}

/**
 * Refresh access token with refreshToken
 * @param {string} refreshToken
 * @returns {Promise}
 */
const refreshTokens = async (refreshToken) => {
  try {
    const session = await sessionService.verifyRefreshTokenSQL(refreshToken);
    const user = await userService.getUserById(session.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cannot find the user associated with this token');
    }
    await session.destroy();
    return sessionService.generateAuthTokens(user);
  } catch (error) {
    console.error(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid session. Please login again');
  }
}

module.exports = {
  loginUsernameAndPassword,
  logout,
  refreshTokens
}
