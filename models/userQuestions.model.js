const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { users, questions } = require('./index');

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
  selectedAnswers: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userid: {
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
