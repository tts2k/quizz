const httpStatus = require("http-status");
const response = require("../utils/responseTemp");
const { users, questions } = require('../models');
const { userService } = require("../services");

/*
* Get account information
*/
const getAccount = (req, res, next) => {
  try {
    const { id, username, email } = req.user;

    res.send(response(httpStatus.OK, "Success", {
      id, username, email
    }));
  } catch (error) {
    next(error);
  }
}

/*
* Get all questions of an account
*/
const getAccountQuestions = async (req, res, next) => {
  try {
    const answeredQuestions = await users.findAll({
      where: {
        id: req.user.id
      },
      attributes: [],
      joinTableAttributes: ['selectedAnswers'],
      include: [
        { model: questions },
      ]
    })

    res.send(response(httpStatus.OK, "Success", {
      answeredQuestions
    }));
  } catch (error) {
    next(error);
  }
}

/*
* Submit answers
*/
const submitAnswers = async (req, res, next) => {
  try {
    const { questionId, answers } = req.body;
    await userService.submitAnswers(req.user.id, questionId, answers);
    
    res.send(response(httpStatus.OK, "Answer submitted"));
  } catch (error) {
    next(error);
  }
}

/*
* Update user
*/
const updateUser = async (req, res, next) => {
  try {
    const user = {};
    if (user.isAdmin) {
      user = req.body;
    }
    else {
      user = { email: req.body.email }
    }
    await userService.updateUserById(user.id, user);

    res.send(response(httpStatus.OK, "User successfully updated"));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAccount,
  getAccountQuestions,
  updateUser,
  submitAnswers
}
