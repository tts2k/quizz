const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const now = require('moment');
const logger = require('../config/logger');
const fs = require('fs');

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
}, { 
  underscored: true ,
  hooks: {
    afterDestroy: async (instance, options) => {
      fs.promises.unlink(instance.dataValues.image).catch(error => console.error(error));
    },
    afterUpdate: async (instance, options) => {
      if (instance._previousDataValues.image !== instance.dataValues.image) {
        fs.promises.unlink(instance._previousDataValues.image).catch(error => console.error(error));
      }
    }
  }
});

questions.findOneRandom = function() {
  return this.findOne({
    order: [
      [Sequelize.fn( 'RANDOM' )]
    ]
  });
};

(async function() {
  await sequelize.sync().then(() => {
    logger.info("Sync questions Table success!");
  });
})().catch((error) => {
    logger.error("Sync questions Table fail");
    logger.error(error);
});

module.exports = questions;
