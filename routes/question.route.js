const express = require('express');
const questionController = require('../controllers/question.controller');
const validate = require('../middlewares/validate');
const questionValidation = require('../validations/question.validation');
const customValidation = require('../validations/custom.validation');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const jsonFormData = require('../middlewares/jsonFormData');

const router = express.Router();

router
  .route('/')
  .get(validate(questionValidation.getAllQuestions), questionController.getAllQuestions)
  .get(auth(), validate(customValidation.autoIncrementId), questionController.getQuestion)
  .post(
    auth(true),
    upload.fields(
      [ { name: 'image', maxCount: 1 } ],
      [ { name: 'json', maxCount: 1 } ]
    ),
    jsonFormData(),
    validate(questionValidation.createQuestion),
    questionController.createQuestion
  )
  .put(
    auth(true),
    upload.fields(
      [ { name: 'image', maxCount: 1 } ],
      [ { name: 'json', maxCount: 1 } ]
    ),
    jsonFormData(),
    validate(questionValidation.updateQuestion),
    questionController.updateQuestion
  )
  .delete(auth(true), validate(customValidation.autoIncrementId), questionController.deleteQuestion);

router
  .route('/random')
  .get(auth(), questionController.getRandomQuestion);

router
  .route('/:id')
  .get(auth(),validate(questionValidation.getQuestion) ,questionController.getQuestion)
module.exports = router;
