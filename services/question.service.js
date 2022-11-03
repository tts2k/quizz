const sequelize = require("../config/db");
const { itemsPerPage } = require("../constants");
const { questions, answers } = require("../models")

const getAllQuestions = async (page) => {
  return await questions.findAndCountAll({
    limit: itemsPerPage,
    offset: page * (page - 1) * itemsPerPage,
  })
};

const createQuestion = async (question, answers) => {
  const t = await sequelize.transaction(); // transaction initialization
  try {
    const question = await questions.create(question, { transaction: t }); 
    const answers = await answers.bulkCreate(answers.map(a => {
      return {
        ...a,
        questionId: question.id
      }
    }))
  }
  catch (error) {
    t.rollback();
    throw error;
  }
};

const getQuestionById = async (id) => {
  return await questions.findByPk(id);
}

const removeQuestionById = async (id) => {
  return await questions.destroy({ where: { id: id }});
}

const updateQuestionById = async (questionId, updateBody) => {
  const t = await sequelize.transaction(); // transaction initialization
  try {
    const question = await getQuestionById(questionId);
    if (!question) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    
    Object.assign(question, updateBody);
    await question.save({ trasaction: t });
  } catch (error) {
    t.rollBack();
    throw error;
  }
}

module.exports = {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  removeQuestionById,
  updateQuestionById
}
