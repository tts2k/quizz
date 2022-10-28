const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const userQuestions = db.define("userQuestions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  answerDetail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selectedAnswers: {
    type: DataTypes.STRING,
    allowNull: false
  },

  createdAt: DataTypes.DATE(now()),
  updatedAt: DataTypes.DATE(now())
}, { underscored: true });

userQuestions.beforeCreate(async (userQuestion, options) => {
  user.selectedAnswers = JSON.stringify(userQuestion.selectedAnswers); 
});

(async function() {
  await sequelize.sync().then(() => {
      logger.info("Sync userQuestions Table success!");
  });
})().catch((error) => {
    logger.error("Sync userQuestions fail");
    logger.error(error);
});

module.exports = userQuestions;
