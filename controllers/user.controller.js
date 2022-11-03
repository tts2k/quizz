const httpStatus = require("http-status");
const response = require("../utils/responseTemp");
const { users, questions, userQuestions } = require('../models');

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

const getAccountQuestions = async (req, res, next) => {
  try {
    const answeredQuestions = await users.findAll({
      where: {
        id: req.user.id
      },
      attributes: [],
      joinTableAttributes: ['selectedAnswers'],
      include: [
        {
          model: questions,
        },
      ]
    })

    res.send(response(httpStatus.OK, "Success", {
      answeredQuestions
    }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAccount,
  getAccountQuestions
}
