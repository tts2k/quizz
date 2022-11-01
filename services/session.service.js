const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config') 
const { userSessions } = require('../models/userSessions.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../constants');
const httpStatus = require('http-status');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {moment.Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

/**
 * Save userSession into SQL
 * @param {Number} userId
 * @param {string} 
 * @param {string} type
 * @param {Moment} expireTime
 * @returns {Promise<userSessions>>}
 */
const saveUserSession = async ( userId, refreshToken, expires) => {
  const session = await userSessions.create({
    userId,
    refreshToken,
    expireTime: expires.toDate(),
  });
  return session
};

/**
 * Verify refresh token and return session (or throw an error if it is not valid)
 * @param {string} refreshToken
 * @returns {Promise<userSessions>}
 */
const verifyRefreshTokenSQL = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, config.jwt.secret);
  const userId = payload.sub;
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'userId not found');
  }
  const session = await userSessions.findOne({ where: { userId, token: refreshToken } });
  if (!session) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  return session;
};

/**
 * Generate auth tokens and save into DB
 * @param {Object} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);

  const session = await saveUserSession(user.id, refreshToken, refreshTokenExpires);
  if (!session) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Save session failed');
  }

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveUserSession,
  verifyRefreshTokenSQL,
  generateAuthTokens,
};
