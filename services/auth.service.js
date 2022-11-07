const httpStatus = require("http-status");
const userService = require('./user.service');
const sessionService = require('./session.service');
const { userSessions } = require("../models");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const redis = require("../config/redis");

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
  const userId = await sessionService.verifyRefreshTokenRedis(refreshToken);
  await redis.del(userId, refreshToken);
}

/**
 * Refresh access token with refreshToken
 * @param {string} refreshToken
 * @returns {Promise}
 */
const refreshTokens = async (refreshToken) => {
  try {
    const userId = await sessionService.verifyRefreshTokenRedis(refreshToken);
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cannot find the user associated with this token');
    }
    await redis.del(userId, refreshToken);
    return sessionService.generateAuthTokens(user);
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid session. Please login again');
  }
}

module.exports = {
  loginUsernameAndPassword,
  logout,
  refreshTokens
}
