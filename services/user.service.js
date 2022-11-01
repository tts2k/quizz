const httpStatus = require('http-status');
const { users } = require('../models/index');
const helper = require('../utils/users.util');
const ApiError = require('../utils/ApiError');

/**
 * Create an user
 * @param {Object} userbody
 * @return {Promise<User>}
 */
const createUser = async (userBody) => {
  await helper.verifyUserBody()
  return users.create({ ...userBody });
}

/*
* Get user by pk
*/
const getUserById = async (id) => {
  return users.findByPk(id);
}

/*
* Get user by username
*/
const getUserByUsername = async (_username) => {
  return users.findOne({ where: { email: _email }});
}

/**
 * Update user
 * @param {users} user
 * @param {Object} updateBody
 * @returns {Promise<users>}
 */
const updateUser = async (user, updateBody) => {
  Object.assign(user, updateBody);
  await user.save();
}

/**
 * Update user by pk
 * @param {number} userId
 * @param {Object} updateBody
 * @returns {Promise<users>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await helper.verifyUserBody(user, updateBody);
  updateUser(user, updateBody);
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  await user.destroy();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
}

const changePasswordById = async (userId, body) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isOldPasswordCorrect = await user.checkPassword(body.oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Old password is not correct');
  }
  user.password = body.newPassword;
  await user.save();
  return user;
}

module.exports = {
  updateUserById, deleteUserById, changePasswordById, createUser, getUserByUsername
}
