const { answers } = require("../models")

const getAnswerById = async (answerId, updateBody) => {
  return await answers.findByPk(id);
}

const updateAnswerById = async (questionId, updateBody) => {
  const t = await sequelize.transaction(); // transaction initialization
  try {
    const answer = await getAnswerById(questionId);
    if (!answer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    
    Object.assign(answer, updateBody);
    await answer.save({ trasaction: t });
  } catch (error) {
    t.rollBack();
    throw error;
  }
}

module.exports = {
  updateAnswerById
}
