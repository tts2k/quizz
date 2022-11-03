const httpStatus = require("http-status");
const response = require("../utils/responseTemp");
const { users, questions, userQuestions } = require('../models');

module.exports = {
  getAccount,
  getAccountQuestions
}
