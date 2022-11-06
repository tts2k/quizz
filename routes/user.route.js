const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const userValidation = require('../validations/user.validation');

const router = express.Router();

router
  .route('/')
  .get(auth(), userController.getAccount)
  .post(auth(), userController.updateUser)

router
  .route('/questions')
  .get(auth(), userController.getAccountQuestions)
  .post(auth(), validate(userValidation.submitAnswers), userController.submitAnswers)

module.exports = router;
