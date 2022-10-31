const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { questions } = require('./index');

const answers = db.define("answers", {
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

  createdAt: DataTypes.DATE(now()),
  updatedAt: DataTypes.DATE(now())
}, { underscored: true });

questions.hasMany(answers, { foreignKey: 'questionId' });
answers.belongsTo(questions, { foreignKey: 'questionId', targetKey: 'id' });

(async function() {
  await sequelize.sync().then(() => {
      logger.info("Sync answers Table success!");
  });
})().catch((error) => {
    logger.error("Sync answers answers fail");
    logger.error(error);
})

module.exports = answers;
