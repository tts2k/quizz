const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const now = require('moment');
const logger = require('../config/logger');

const questions = sequelize.define("questions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  questionDetail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
  },

  createdAt: DataTypes.DATE(now()),
  updatedAt: DataTypes.DATE(now())
}, { underscored: true });

(async function() {
  await sequelize.sync().then(() => {
      logger.info("Sync questions Table success!");
  });
})().catch((error) => {
    logger.error("Sync questions Table fail");
    logger.error(error);
});

module.exports = questions;
