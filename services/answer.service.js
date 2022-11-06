const sequelize = require("../config/db");
const { answers } = require("../models")

/**
 * Get answer by id
 * @param {number} id
 * @returns {Promise}
 */
const getAnswerById = async (id) => {
  return await answers.findByPk(id);
}

/**
 * Get answers by questionId
 * @param {number} id
 * @returns {Promise}
 */
const getAnswersByQuestionId = async (id) => {
  return await answers.findAll({ where: { questionId: id }});
}

/**
 * Update answer by id
 * @param {number} answerId
 * @returns {Promise}
 */
const updateAnswerById = async (answerId, updateBody) => {
  const t = await sequelize.transaction(); // transaction initialization
  try {
    const answer = await getAnswerById(answerId);
    if (!answer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    
    Object.assign(answer, updateBody);
    await answer.save({ transaction: t });

    t.commit();
  } catch (error) {
    await t.rollBack();
    throw error;
  }
}

/**
 * Create new answser
 * @param {object} _answer
 * @returns {Promise}
 */
const createAnswer = async (_answer) => {
  const t = await sequelize.transaction();
  try {
    const result = await answers.create(_answer, { transaction: t });
    t.commit();
    return result;
  } catch (error) {
    t.rollBack();
    throw error;
  }
}

module.exports = {
  updateAnswerById,
  getAnswerById,
  createAnswer,
  getAnswerById,
  getAnswersByQuestionId
}
