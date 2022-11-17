const Joi = require("joi");

const getAllQuestions = {
  query: Joi.object().keys({
    page: Joi.number().required(),
    keyword: Joi.string()
  }),
}

const getQuestion = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
}

const createQuestion = {
  body: Joi.object().keys({
    question: Joi.object().keys({
      questionDetail: Joi.string().required()
    }),
    answers: Joi.array().items({
      answerDetail: Joi.string().required(),
      isCorrect: Joi.boolean().required(),
    })
  })
}

const updateQuestion = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    questionDetail: Joi.string(),
  })
}

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  getQuestion
}       
