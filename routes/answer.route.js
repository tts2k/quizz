const express = require('express');
const answerController = require('../controllers/answer.controller');
const validate = require('../middlewares/validate');
const answerValidation = require('../validations/answer.validation');
const { autoIncrementId } = require('../validations/custom.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(true), validate(answerValidation.createAnswer), answerController.createAnswer)
  .put(auth(true), validate(answerValidation.updateAnswerById), answerController.updateAnswer)
  .get(auth(), validate(autoIncrementId), answerController.getAnswerById);

module.exports = router;
