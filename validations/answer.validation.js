const Joi = require("joi");

const updateAnswerById = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    answerDetail: Joi.string(),
    isCorrect: Joi.boolean(),
  })
}

const createAnswer = {
  body: Joi.object().keys({
    answerDetail: Joi.string().required(),
    isCorrect: Joi.string().required(),
    questionId: Joi.number().required()
  })
}

module.exports = {
  createAnswer,
  updateAnswerById
}       
