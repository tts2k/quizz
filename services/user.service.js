const httpStatus = require('http-status');
const { users, userQuestions } = require('../models/index');
const questionService = require('./question.service');
const helper = require('../utils/users.util');
const ApiError = require('../utils/ApiError');
const sequelize = require('../config/db');

/**
 * Create an user
 * @param {Object} userbody
 * @return {Promise<User>}
 */
const createUser = async (userBody) => {
  await helper.verifyUserBody(userBody);
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
  return users.findOne({ where: { username: _username }});
}

/**
 * Update user
 * @param {users} user
 * @param {Object} updateBody
 * @returns {Promise<users>}
 */
const updateUser = async (user, updateBody) => {
  const t = sequelize.transaction();
  try {
    Object.assign(user, updateBody);
    await user.save({ transaction: t });
    t.commit();
  } catch (error) {
    await t.rollback();
    throw error();
  }
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

/**
 * Delete user by pk
 * @param {number} userId
 * @param {Object} updateBody
 * @returns {Promise<users>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  await user.destroy();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
}

/**
 * Change user password by pk
 * @param {number} userId
 * @param {Object} updateBody
 * @returns {Promise<users>}
 */
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

/**
 * Submit answer
 * @param {number[]} answers
 * @returns {Promise}
 */
const submitAnswers = async (userId, questionId, answers) => {
  const t = await sequelize.transaction();
  try {
    const question = await questionService.getQuestionById(questionId);
    if (!question) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Question doesn't exist")
    }

    await userQuestions.create({
      userId,
      questionId,
      selectedAnswers: JSON.stringify(answers)
    });
    t.commit();
  }
  catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = {
  updateUserById,
  deleteUserById,
  changePasswordById,
  createUser,
  getUserByUsername,
  getUserById,
  submitAnswers,
}
