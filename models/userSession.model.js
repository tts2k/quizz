const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const userSession = db.define("userSession", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  refershToken:{
    type: DataTypes.STRING,
    allowNull: false
  },
  expireTime: {
    type: DataTypes.DATE,
    allowNull: false
  },

  createdAt: DataTypes.DATE(now()),
}, { underscored: true });

(async function() {
  await sequelize.sync().then(() => {
      logger.info("Sync userSession Table success!");
  });
})().catch((error) => {
    logger.error("Sync userSession Table fail");
    logger.error(error);
});

module.exports = userSession;
