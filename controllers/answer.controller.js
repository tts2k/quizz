const httpStatus = require('http-status');
const answerService = require('../services/answer.service');
const response = require('../utils/responseTemp');

/*
* Get Answer by answer id
*/
const getAnswerById = async (req, res, next) => {
  try {
    const answer = await answerService.getAnswerById(req.query.id);
    res.send(response(httpStatus.OK, 'Answer data retrieved', answer));
  } catch (error) {
    next(error)  
  }
}

/*
* Update an answer
*/
const updateAnswer = async (req, res, next) => {
  try {
    const answer = req.body;
    await answerService.updateAnswerById(answer.id, answer);

    res.send(response(httpStatus.OK, "Answer updated successfully"));
  } catch (error) {
    next(error); 
  }
}

/*
* Create an answer
*/
const createAnswer = async (req, res, next) => {
  try {
    const answer = req.body;
    const createdAnswer = await answerService.createAnswer(answer);

    res.send(response(httpStatus.CREATED, "Answer created", createdAnswer));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAnswerById,
  updateAnswer,
  createAnswer
}
