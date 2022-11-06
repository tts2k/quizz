const Joi = require("joi");

const submitAnswers = {
  body: Joi.object().keys({
    questionId: Joi.number().required(),
    answers: Joi.array().items(Joi.number()).required(),
  })
}

const updateUser = {
  body: Joi.object().keys({
    id: Joi.number(),
    username: Joi.string(),
    password: Joi.string(),
    email: Joi.string(),
    isAdmin: Joi.boolean()
  })
}

module.exports = {
  submitAnswers,
  updateUser
}
