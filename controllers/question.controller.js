const httpStatus = require("http-status");
const response = require("../utils/responseTemp");
const questionService = require('../services/question.service');

/*
* Get Question by question id
*/
const getQuestion = async (req, res, next) => {
  try {
    const question = await questionService.getQuestionByIdWithAnswers(req.params.id);
    res.send(response(httpStatus.OK, 'Question detail retrieved.', question));
  } catch (error) {
    next(error);
  }
}

/*
* Get a random question
*/
const getRandomQuestion = async (req, res, next) => {
  try {
    const question = await questionService.getQuestionRandom();
    res.send(response(httpStatus.OK, 'A random question retrieved', question));
  } catch (error) {
    next(error);
  }
}

/*
* Get all question in given page number
*/
const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await questionService.getAllQuestions(req.query.page);
    res.send(response(httpStatus.OK, 'Question list retrieved.', questions));
  } catch (error) {
    next(error);
  }
}

/*
* Create a new question
*/
const createQuestion = async (req, res, next) => {
  try {
    const { question, answers } = req.body;

    const image = req.files.image[0];
    question.image = image.destination + image.filename;

    const createdQuestion = await questionService.createQuestion(question, answers);
    
    const result = {
      question: createdQuestion.dataValues,
      answers: createdQuestion.answers
    }

    res.send(response(httpStatus.OK, 'Question created successfully', result));
  } catch (error) {
    next(error);
  }
}

/*
* Update a question
*/
const updateQuestion = async (req, res, next) => {
  try {
    const question = req.body;
    const image = req.files.image[0];
    if (image && image.filename !== "") {
      question.image = image.destination + image.filename;
    }

    const updatedQuestion = await questionService.updateQuestionById(question.id, question);

    res.send(response(httpStatus.OK, 'Question updated successfully', updatedQuestion));
  } catch (error) {
    next(error);
  }
}

/*
* Delete a question
*/
const deleteQuestion = async (req, res, next) => {
  try {
    const question = await questionService.removeQuestionById(req.query.id);
    if (question > 0) {
      res.send(response(httpStatus.OK, 'Question deleted successfully'));
    }
    else {
      res.send(response(httpStatus.OK, 'There is no quesiton to delete'));
    }
  } catch (error) {
    
  }
}

module.exports = {
  getQuestion,
  getAllQuestions,
  createQuestion,
  updateQuestion,
  getRandomQuestion,
  deleteQuestion,
}
