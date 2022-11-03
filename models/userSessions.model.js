const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const users = require('./users.model');
const now = require('moment');
const logger = require('../config/logger');

const userSessions = sequelize.define("userSession", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  refreshToken:{
    type: DataTypes.STRING,
    allowNull: false
  },
  expireTime: {
    type: DataTypes.DATE,
    allowNull: false
  },

  createdAt: DataTypes.DATE(now()),
}, { underscored: true });

users.hasMany(userSessions, { foreignKey: 'userId' });

(async function() {
  await sequelize.sync().then(() => {
      logger.info("Sync userSessions Table success!");
  });
})().catch((error) => {
    logger.error("Sync userSessions Table fail");
    logger.error(error);
});

module.exports = userSessions;
