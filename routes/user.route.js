const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(), userController.getAccount);

router
  .route('/questions')
  .get(auth(), userController.getAccountQuestions);

module.exports = router;
