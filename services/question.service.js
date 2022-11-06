const sequelize = require("../config/db");
const { itemsPerPage } = require("../constants");
const { questions, answers } = require("../models")
const answerService = require("../services/answer.service");

/**
 * Get all questions
 * @param {string} page
 * @returns {Promise}
 */
const getAllQuestions = async (page) => {
  return await questions.findAndCountAll({
    limit: itemsPerPage,
    offset: page * (page - 1) * itemsPerPage,
  })
};

/**
 * Get a random question
 * @returns {Promise}
 */
const getQuestionRandom = async () => {
  const selectedQuestion = await questions.findOneRandom();
  const selectedAnswers = await answerService.getAnswersByQuestionId(selectedQuestion.id);

  return {
    question: selectedQuestion,
    answers: selectedAnswers
  }
}

/**
 * Create new question
 * @param {questions} question
 * @param {answers[]} answers
 * @returns {Promise}
 */
const createQuestion = async (_question, _answers) => {
  const t = await sequelize.transaction(); // transaction initialization
  try {
    const createdQuestion = await questions.create(_question, { transaction: t }); 
    const createdAnswers = await answers.bulkCreate(_answers.map(a => {
      return {
        ...a,
        questionId: createdQuestion.id
      }
    }), { transaction: t })

    t.commit();

    return {
      ...createdQuestion,
      answers: createdAnswers
    }
  }
  catch (error) {
    await t.rollback();
    throw error;
  }
};

/**
 * Get question by question id
 * @param {String} id
 * @returns {Promise}
 */
const getQuestionById = async (id) => {
  return await questions.findByPk(id);
}

/**
 * Get question by question id with answers
 * @param {String} id
 * @returns {Promise}
 */
const getQuestionByIdWithAnswers = async (id) => {
  const selectedQuestion = await questions.findByPk(id);
  const selectedAnswers = await answerService.getAnswersByQuestionId(selectedQuestion.id);

  return {
    question: selectedQuestion,
    answers: selectedAnswers
  }
}

/**
 * Remove question by question id
 * @param {String} id
 * @returns {Promise}
 */
const removeQuestionById = async (id) => {
  return await questions.destroy({ where: { id: id }, individualHooks: true });
}

/**
 * Update question by question id
 * @param {String} questionId
 * @param {Object} updatebody
 * @returns {Promise}
 */
const updateQuestionById = async (questionId, updateBody) => {
  const t = await sequelize.transaction(); // transaction initialization
  try {
    const question = await getQuestionById(questionId);
    if (!question) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    
    Object.assign(question, updateBody);
    await question.save({ transaction: t, individualHooks: true });
    t.commit();
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  removeQuestionById,
  updateQuestionById,
  getQuestionRandom,
  getQuestionByIdWithAnswers
}
