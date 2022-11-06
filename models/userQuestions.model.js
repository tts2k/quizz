const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const now = require('moment');
const users = require('./users.model');
const questions = require('./questions.model');
const logger = require('../config/logger');

const userQuestions = sequelize.define("userQuestions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: users,
      key: 'id'
    }
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: questions,
      key: 'id'
    }
  },
  selectedAnswers: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: DataTypes.DATE(now()),
  updatedAt: DataTypes.DATE(now())
}, { underscored: true });

userQuestions.beforeCreate(async (userQuestion, _) => {
  userQuestion.selectedAnswers = JSON.stringify(userQuestion.selectedAnswers); 
});

users.belongsToMany(questions, { through: userQuestions });
questions.belongsToMany(users, { through: userQuestions });

(async function() {
  await sequelize.sync().then(() => {
      logger.info("Sync userQuestions Table success!");
  });
})().catch((error) => {
    logger.error("Sync userQuestions fail");
    logger.error(error);
});

module.exports = userQuestions;
